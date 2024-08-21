const axios = require('axios');
const listener = require('endurance-core/lib/listener')();
const Webhook = require('../models/webhook.model');

const callWebhook = async (webhook, event, data) => {
    try {
        const response = await axios.post(webhook.url, {
            event,
            data
        });
        console.log(`Webhook called: ${webhook.url} for event: ${event}, Response: ${response.status}`);
    } catch (error) {
        if (error.response) {
            console.error(`Webhook call failed: ${webhook.url}, Status: ${error.response.status}, Data: ${error.response.data}`);
        } else if (error.request) {
            console.error(`Webhook call failed: ${webhook.url}, No response received`);
        } else {
            console.error(`Webhook call failed: ${webhook.url}, Error: ${error.message}`);
        }
    }
};

listener.createAnyListener(async (event, data) => {
    console.log(`Event received: ${event}`);
    try {
        const webhooks = await Webhook.find({ event });
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

module.exports = listener;