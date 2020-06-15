const express = require('express');
const router = express.Router();
const { serviceOwnerController, serviceController } = require('./../controllers/allControllers');
const { Auth } = require('../middlewares/Auth');
const adminAuth = require('../config/adminAuth');

Auth(router, adminAuth);

// Retrieve all service owners
router.get('/service-owners', serviceOwnerController.all);

module.exports = router;