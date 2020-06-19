const express = require('express')
const router = express.Router()
const { Auth } = require('../middlewares/Auth');
const  category= require('../controllers/category');
// Auth(router);

router.get('/products/:id', category.showCategoryProducts);
// router.post('/add',category.add);


module.exports = router
