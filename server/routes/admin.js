const express = require('express');
const router = express.Router();
const { serviceOwnerController, categoryController } = require('./../controllers/allControllers');
const { Auth } = require('../middlewares/Auth');
const adminAuth = require('../config/adminAuth');
const multer  = require('multer');


const storage = multer.diskStorage({
destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
},
filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
}
});

// Set filters to image upload
const fileFilter = (req, file, cb) => {
if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
    cb(null,true)
} else {
    cb(new Error('only allowed types are jpeg, png, jpg'), false)
}
}

// Apply multer option to image upload
const upload = multer({
storage,
fileFilter
});

// Auth(router, adminAuth);

// Retrieve all service owners
router.get('/service-owners', serviceOwnerController.all);

// Delete a service owner
router.delete('/service-owners/:id/delete', serviceOwnerController.remove);

// add new category
router.post('/categories', upload.single('image'), categoryController.add);

// Delete a category
router.delete('/categories/:id', categoryController.remove);

module.exports = router;