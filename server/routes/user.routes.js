const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const adminAuth = require("../config/adminAuth");
//Login and Sign up localhost:5000/user/login

const serviceOwner = require("../config/serviceOwner");
const productOwner = require("../config/productOwner");
const { Auth } = require('../middlewares/Auth');
const imageUploader = require('../utils/imageUploader');

const upload = imageUploader('public/uploads/users/images');

/*
//regesiterServiceOWnerTEST

// router.post('/registerSO', userController.regesiterSO);

*/
// router.post('/registerPO', userController.regesiterPO);


// Customize auth message Protect the  routes
// and prevent copy paste {passport.authenticate('jwt', { session: false }),}
router.post('/register', userController.regesiter);

router.post(
  '/profile/avatar/:id',
  // AAuth,
  
  upload.single('avatar'),
  userController.uploadAvatar,
  (error, req, res, next) => {
    return res.status(400).send({ message: error.message ,req});
  }
);
router.post('/login', userController.login);


Auth(router);



//_____________________________Protected route  (all user routes will be here )_____________________________________



router.get('/admin', adminAuth,
    (req, res, next) => {
        console.log("body : ", req.body)
        return res.send({ status: 200, user: req.user })
    });

    router.get('/logincheck',
    (req, res, next) => {
        return res.send({ msg: "okey you are authorized user now :)", user: req.user })
    });
    router.get('/productsTEST',productOwner,
    (req, res, next) => {
        return res.send({ msg: "okey you are authorized user now :)", user: req.user });
    });



    //get all users
    router.get("", userController.getAllUsers);

    //update users
    router.patch('/:id', userController.updateUser);

    //get user by id
    router.get('/:id/',userController.getUser);
    

module.exports = router;