const express = require('express');
const Webhook = require('./models/webhook'); // Assure-toi que le chemin est correct
const RouterBase = require('./router'); // Assure-toi que le chemin est correct
const auth = require('endurance-core/lib/auth');

const router = RouterBase();

const restrictWebhookAccess = {
  checkPermissions: auth.checkUserPermissions(['canManageWebhooks']),
  restrictToOwner: auth.restrictToOwner((req) => req.webhook.userId)
};

// Utilisation de l'autowire avec les restrictions d'accès
RouterBase.autoWire(router, Webhook, 'Webhook', restrictWebhookAccess);

module.exports = router;
