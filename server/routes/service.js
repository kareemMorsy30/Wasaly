const express = require('express');
const router = express.Router();
const { serviceController } = require('./../controllers/allControllers');

// Request a service owner for delivery
router.post('/order', serviceController.order);

// Get all transportation methods
router.get('/transportations', serviceController.transportation);

module.exports = router;