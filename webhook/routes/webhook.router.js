const router = require('endurance-core/lib/router').RouterBase({requireDb: true});
const Webhook = require('../models/webhook.model');
const auth = require('endurance-core/lib/auth');


const restrictWebhookAccess = {
  checkPermissions: auth.checkUserPermissions(['canManageWebhooks']), // Pass the function reference
  restrictToOwner: auth.restrictToOwner((req) => req.webhook.userId)  // Pass the function reference
};

// Utilisation de l'autowire avec les restrictions d'accès
RouterBase.autoWire(router, Webhook, 'Webhook', restrictWebhookAccess);

module.exports = router;
