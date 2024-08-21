const router = require('endurance-core/lib/router')({ requireDb: true });
const auth = require('endurance-core/lib/auth');
const Webhook = require('../models/webhook.model');

router.autoWire(Webhook, 'Webhook', {
  checkUserPermissions: auth.checkUserPermissions(['canManageWebhooks']),
  restrictToOwner: auth.restrictToOwner((req) => req.webhook.userId)
});

module.exports = router;