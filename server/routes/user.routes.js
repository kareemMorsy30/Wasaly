const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const adminAuth = require("../config/adminAuth");
//Login and Sign up localhost:5000/user/login

const serviceOwner = require("../config/serviceOwner");
const productOwner = require("../config/productOwner");
const { Auth } = require('../middlewares/Auth');
const imageUploader = require('../utils/imageUploader');
const passport = require('passport');

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


// Auth(router);

router.all('*', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    
    console.log('====================================');
    console.log("user",user);
    console.log('====================================');
    
      if (err || !user) {
        console.log("user :::::::::::: ",user, typeof user);
        console.log("err",err);
        
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

//_____________________________Protected route  (all user routes will be here )_____________________________________
// /users



router.post('/admin', adminAuth,
    (req, res, next) => {
        console.log("body : ", req.body)
        return res.send({ status: 200, user: req.user })
    });


    router.get("/auth", (req, res) => {
      res.status(200).json({
          _id: req.user._id,
          isAdmin: req.user.role !== "admin" ? false : true,
          isAuth: true,
          email: req.user.email,
          name: req.user.name,
          status:req.user.status,
          address:req.user.address,
          username: req.user.username,
          role: req.user.role,
          avatar: req.user.avatar,
          cart: req.user.cart,
      });
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
    router.post('/addToCart',userController.addToCart);
router.post('/removeFromCart',userController.removeFromCart);
router.get('/userCartInfo',userController.userCartInfo);

module.exports = router;