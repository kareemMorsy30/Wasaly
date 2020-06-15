const express = require('express')
const router = express.Router()
const productOwner= require('../config/productOwner')
const { Auth } = require('../middlewares/Auth');
const { serviceOwnerController, productOwnerController } = require('../controllers/allControllers');

// call authentication and authorization for product owner routes
Auth(router, productOwner);

// Product owner can list all unconnected service owners
router.get('/idle', serviceOwnerController.allIdle);

// Product owner connect to one of service owners
router.patch('/connect', productOwnerController.connect);

module.exports = router;