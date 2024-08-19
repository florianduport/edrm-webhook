const axios = require('axios');
const { createAnyListener } = require('endurance-core/lib/listener');
const Webhook = require('../models/webhook.model'); // Assure-toi que le chemin est correct

// Fonction pour appeler les webhooks
const callWebhook = async (webhook, event, data) => {
    try {
        const response = await axios.post(webhook.url, {
            event,
            data
        });
        console.log(`Webhook called: ${webhook.url} for event: ${event}, Response: ${response.status}`);
    } catch (error) {
        // Log l'erreur mais ne bloque pas l'application
        if (error.response) {
            // Réponse reçue avec un code de statut hors 2xx
            console.error(`Webhook call failed: ${webhook.url}, Status: ${error.response.status}, Data: ${error.response.data}`);
        } else if (error.request) {
            // La requête a été faite mais aucune réponse n'a été reçue
            console.error(`Webhook call failed: ${webhook.url}, No response received`);
        } else {
            // Autre erreur
            console.error(`Webhook call failed: ${webhook.url}, Error: ${error.message}`);
        }
    }
};

// Listener pour tous les événements
createAnyListener(async (event, data) => {
    console.log(`Event received: ${event}`);
    try {
        // Trouver les webhooks associés à cet événement
        const webhooks = await Webhook.find({ event });
        // Appeler chaque webhook de manière asynchrone
        webhooks.forEach(webhook => {
            callWebhook(webhook, event, data).catch(error => {
                console.error(`Error in calling webhook: ${webhook.url}`, error);
            });
        });
    } catch (error) {
        console.error(`Error processing event: ${event}`, error);
    }
});

console.log('Webhook listener initialized');
