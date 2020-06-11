const express = require('express');
const router = express.Router();
const { serviceController } = require('./../controllers/allControllers');

// Request a service owner for delivery
router.post('/order', serviceController.order);

module.exports = router;