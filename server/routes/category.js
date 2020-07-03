const express = require('express')
const router = express.Router()
const { Auth } = require('../middlewares/Auth');
const  category= require('../controllers/category');
// Auth(router);

router.get('/categoryproducts/:id', category.showCategoryProducts);
router.post('/add',category.add);
// router.post('/listcat',category.getAllCategories);



module.exports = router
