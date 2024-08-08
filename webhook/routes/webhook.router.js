const express = require('express');
const Webhook = require('./models/webhook'); // Assure-toi que le chemin est correct
const RouterBase = require('./router'); // Assure-toi que le chemin est correct

const router = Router();
RouterBase.autoWire(router, Webhook, 'Webhook');

module.exports = router;
