const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du schéma pour les webhooks
const webhookSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Middleware pour vérifier les URL des webhooks
webhookSchema.pre('save', function(next) {
    const webhook = this;
    // Ici, on peut ajouter une validation pour vérifier que l'URL est valide.
    if (!isValidURL(webhook.url)) {
        const err = new Error('URL invalide');
        next(err);
    } else {
        next();
    }
});

// Fonction de validation d'URL (simple)
function isValidURL(url) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
}

// Création du modèle Webhook
const Webhook = mongoose.model('Webhook', webhookSchema);

module.exports = Webhook;
