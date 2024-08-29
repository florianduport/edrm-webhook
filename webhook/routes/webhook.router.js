import routerFactory from 'endurance-core/lib/router';
import * as auth from 'endurance-core/lib/auth';
import Webhook from '../models/webhook.model';

const router = routerFactory({ requireDb: true });

router.autoWire(Webhook, 'Webhook', {
  checkUserPermissions: auth.checkUserPermissions(['canManageWebhooks']),
  restrictToOwner: auth.restrictToOwner((req) => req.webhook.userId)
});

export default router;