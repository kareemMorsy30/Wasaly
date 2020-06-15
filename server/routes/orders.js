const express = require('express')
const router = express.Router()
const {  listOrders, chaneOrderStatus } = require('../controllers/order')
const { route } = require('./search')
const productOwner= require('../config/productOwner')
const passport = require('passport');


router.all('*', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            const error = new Error('You are not authorized to access this area');
            error.status = 401;
            //in the middleware file  will catch it
            throw error;
        }

        //
        req.user = user;
        //every loged in request we will get the user object
        return next();
    })(req, res, next); //miidleware of passport
});


router.get('/',productOwner, listOrders)
router.post('/:id/status', chaneOrderStatus)

module.exports = router