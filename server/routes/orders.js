const express = require('express')
const router = express.Router()
const {  listOrders, chaneOrderStatus } = require('../controllers/order')
const { route } = require('./search')
const productOwner= require('../config/productOwner')
const passport = require('passport');
const { Auth } = require('../middlewares/Auth');

Auth(router);



router.get('/',productOwner, listOrders)
router.post('/:id/status', chaneOrderStatus)

module.exports = router