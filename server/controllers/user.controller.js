const User = require("../models/user");
const allModels = require('../models/allModels');
// const userModel = require('../models/user');
const { Product } = allModels;
const Order = require('../models/order')
const jwt = require("jsonwebtoken");
let userController = {};
const port = process.env.PORT
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Token = require('../models/tokenVerification')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
var mongoose = require('mongoose');
const { pushNotification } = require('./controller');




userController.regesiter = async (req, res, next) => {

    const { name, username, email, password, role, phones, address } = req.body;
    const newUser = new User({
        name, username, email, password, phones, role, address
    });
 
    if (newUser.role === "admin") {

        res.send({ message: "You Are Not Allowrd to be an Admin " })
    }

    if (newUser._id != undefined && newUser.role === "customer") {
        try {
         
            const user = await newUser.save()

            sendEmail(req, res, user)
        }
        catch (e) {
            console.log(e)
            if (e.name === "MongoError" && e.code === 11000) {
                const error = new Error(`Email address ${newUser.email} is already taken`);
                error.status = 400
                next(error);
            } else {
                next(e);

            }
        }
    }

    else if (newUser.role === "serviceowner") {
        const { user, distance, region, transportation } = req.body;
        try {

            await newUser.save();

            const newServiceOwner = new allModels.ServiceOwner({
                user: newUser._id, distance, region, transportation
            });
            // console.log("\n  new USER :::     ", newUser.role);
            const serviceOwner = await newServiceOwner.save();
         
            sendEmail(req,res,newUser)
        }
        catch (e) {
            console.log(e)
            
            if (e.name === "MongoError" && e.code === 11000) {
               
                const error = new Error(`Email address ${newUser.email} is already taken`);
                error.status = 400
                next(error);
            } else {
                next(e);

            }
        }
    }
    else if (newUser.role === "productowner") {
        const { user, marketName, ownerName, marketPhone } = req.body;
        try {
            await newUser.save();
            const newProductOwner = new allModels.productOwner({
                user: newUser._id, marketName, ownerName, marketPhone
            });
         
            const productOwner = await newProductOwner.save();
           
            sendEmail(req,res,newUser)
        } catch (e) {
            if (e.name === "MongoError" && e.code === 11000) {
                console.log(e);
                const error = new Error(`Email address ${newUser.email} is already taken`);
                error.status = 400
                next(error);
            } else {
                next(e);

            }
        }
    }
};

const sendEmail = (req, res, user) => {
   
    try {
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

        // Save the verification token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }

            // Send the email
            var transporter = nodemailer.createTransport({ service: 'Gmail', auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS } });
            var mailOptions = { from: process.env.GMAIL_USER, to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/users\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                // if (err) { return res.status(500).send({ msg: err.message }); }
                if (err) console.log(err)
                res.status(200).send({ user, message: 'A verification email has been sent to ' + user.email + '.' });
            });
        })

    } catch (err) {
        console.log(err)
    }

}


userController.confirmationPost = function (req, res, next) {

    // Find a matching token
    Token.findOne({ token: String(req.params.token) }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

        // If we found a token, find a matching user
        User.findOne({ _id: String(token._userId) }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    });
};

userController.resendTokenPost = function (req, res, next) {


    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }

            // Send the email
            var transporter = nodemailer.createTransport({ service: 'Gmail', auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS } });
            var mailOptions = { from: process.env.GMAIL_USER, to: user.email, to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + 'localhost:8000/users' + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
        });

    });
};

userController.login = async (request, response, next) => {
    const { email, password } = request.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const err = new Error(`the email ${email} was not found`);
            err.status = 401;
            return next(err);
        }
        // throw new Error('Please Confirm your email to login');

        if (!user.isVerified) return response.status(500).send({ msg: 'Please Confirm your email to login' });
        // console.log("User", user);
        user.isPasswordMatch(password, user.password, (err, matched) => {
            if (matched) {
                //Generate jwt if credintials okay
                //secret
                const secret = process.env.secret;
                //expiration
                const expire = process.env.expirationDate;
                //for now just id but we can pass all the user object {sub:user._id}
                const token = jwt.sign({ _id: user._id, role: user.role }, secret, {
                    expiresIn: expire,
                });
                /**
                 * we will use this token with passport to make sure that the server can recognize the toke :)
                 */
                // request.headers.authorization = token;
                let userTemp = {}
                userTemp.role = user.role
                userTemp.email = user.email
                userTemp.name = user.name
                userTemp.id= user._id

                response.send({ token, user: userTemp });
            } else {
                response.status(401).send({
                    error: "Invalid email or password",
                });
            }
        });
    } catch (error) {
        // res.send(error)
        next(error);
    }
};

userController.uploadAvatar = async (req, res) => {
    User.findById(req.params.id, (err, user) => {

     

        if (!user) {
            res.status(404).send("user is not found")


        } else {
            user.avatar = '/uploads/users/images/' + req.file.filename;
            user.save().then(user => {
                res.json("user updated");
            }).catch(err => { res.status(400).send("update not possiple") });
        }
    })
    // // const user = req.user;

    // user.avatar = '/uploads/users/images/' + req.file.filename;
    // await user.save();
    // res.send();

};

userController.googleSignIn = async (req, res) => {
    // console.log(req.body)
    const { Name, email, Image } = req.body
    const password = Math.random().toString(36).slice(-8);

    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        let userid = payload['sub'];
        let user = await User.findOne({ email, googleId: userid })
        if (!user) {
            user = await User.findOne({ googleId: userid })
            if (user) {
                user.email = email
                user.avatar = Image
                user.name = name
                await user.save()
            }
            else {
                user = await User.findOne({ email })
                if (user) {
                    user.googleId = userid
                    await user.save()
                }
                else {
                    user = await new User({ name: Name, email, avatar: Image, googleId: userid, username: Name, role: 'customer', password, isVerified: true })
                    await user.save()
                    try {
                        // Send the email
                        var transporter = nodemailer.createTransport({ service: 'Gmail', auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS } });
                        var mailOptions = { from: process.env.GMAIL_USER, to: user.email, subject: 'Auto Generated Password', text: 'Hello,\n\n' + 'This is your Auto generated password:' + " " + password + ' .\n' };
                        transporter.sendMail(mailOptions, function (err) {
                            if (err) console.log(err)
                        });


                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        }
        const secret = process.env.secret;
        //expiration
        const expire = process.env.expirationDate;
        //for now just id but we can pass all the user object {sub:user._id}
        const token = jwt.sign({ _id: user._id, role: user.role }, secret, {
            expiresIn: expire,
        });

        let userTemp = {}
        userTemp.role = user.role
        userTemp.email = user.email
        userTemp.name = user.name
        userTemp.id= user._id
        res.send({ token, user: userTemp });

    } catch (e) {
        console.log(e)
        res.status(401).send({ error: "Invalid username or password" })
    }


}
// verify().catch(res.status(401).send({ error: "Invalid username or password" }));



userController.addToCart = (req, res) => {
 
    const userID = req.user._id;

    User.findOne({ _id: userID }, (err, userInfo) => {
        let duplicate = false;


        userInfo.cart.forEach((item) => {
            if (item.id == req.query.productId) {
                duplicate = true;
            }
        })


        if (duplicate) {
            Product.findByIdAndUpdate
            ({'_id':req.query.productId}
            , { '$inc': {'quantity':-1}},
            
            )
            .exec()
            ,
            (productss=>productss
            
            
            )
            User.findOneAndUpdate(
                { _id: userID, "cart.id": req.query.productId ,},
                { $inc: { "cart.$.amount": 1 } },
                { new: true },
                (err, userInfo) => {
                    

                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        } else {
            Product.findByIdAndUpdate({'_id':req.query.productId}, { '$inc': {'quantity':-1}}).exec(),(productss=>console.log(productss)
            )

            Product.findOne({_id:req.query.productId},(err,productCart)=>{
               
                User.findOneAndUpdate(
                    { _id: req.user._id },
                    {
                        $push: {
                            cart: {
                                id: req.query.productId,
                                amount: 1,
                                price:productCart.price,
                                date: Date.now()
                            }
                        }
                    },
                    { new: true },
                    (err, userInfo) => {
                        if (err) return res.json({ success: false, err });
                        res.status(200).json(userInfo.cart)
                    }
                )

            }
            )
        
        }
    })
};

userController.getAllUsers = async (req, res) => {
    try {
        let user = await userModel.find()
        res.send(user)
    } catch (err) {
        res.send(err);
    }
}
userController.getUser = async (req, res) => {
    if(req.user){
        return res.send(req.user)
    }else{
        return res.send({err:"user not found"});
    }
    
    // try {
    //     let user = await userModel.findOne({ user: req.user })
    //     console.log("here",req.body);
    //     console.log("hi",req.user);
    //     console.log(user);
    //     res.send(user)
    // }
    // catch (err) {
    //     res.send(err);
    //     console.log(err);
    // }

}
userController.updateUser =async (req, res) => {
    const {name,username,status} = req.body;
    let image_path = 'public/uploads/users/images/' +req.file.filename ;
    // userModel.findByIdAndUpdate( req.user._id , { new: true },{'avatar':image_path}, (error, user) => {
    //     res.status(200).json({ "data": user });
    const user = await User.findOneAndUpdate({_id:req.user._id},{'avatar':image_path,name,username,status})
    res.status(200).json({"data": user});
        // console.log(error);
        console.log("user",user);
        console.log("userID",req.user._id);
//     }).catch((err) => {
//         console.log(err);
//         res.status(400).json({ "error": err });
//     })
}
userController.saveReport = (req, res, next) => {
    try {
        const { report } = req.body
        const { id } = req.params
        const customer = req.user._id;
        allModels.ServiceOwner.findOneAndUpdate({
            user: id
        }, {
            $push: {
                reports: { 'message': report, user: customer }
            }
        }).populate('user')
        .then(owner => {
            const info = { 
                title: 'Service owner reported',
                message: `Customer ${req.user.name} has reported service owner ${owner.user.name}`,
                link: 'http://localhost:3000/admin/service-owners'
            }
            User.findOne({role: 'admin'}).then(admin => pushNotification(admin.email, info));
        })
        .catch(err => console.log(err));
        res.json("Reported Successfully");
    }
    catch (err) {
        next(err)
    }
}

userController.saveProductOwnerReport = (req, res, next) => {
    try {
        const { report } = req.body
        const { id } = req.params
        const customer = req.user._id;
        allModels.productOwner.findOneAndUpdate({
            user: id
        }, {
            $push: {
                reports: { 'message': report, user: customer }
            }
        }).populate('user')
        .then(owner => {
            const info = { 
                title: 'Product owner reported',
                message: `Customer ${req.user.name} has reported product owner ${owner.user.name}`,
                link: 'http://localhost:3000/admin/product-owners'
            }
            User.findOne({role: 'admin'}).then(admin => pushNotification(admin.email, info));
        })
        .catch(err => console.log(err));
        res.json("Reported Successfully");
    }
    catch (err) {
        next(err)
    }
}

userController.removeFromCart = (req, res) => {
    
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
                { "cart": { "id": req.query._id } }
        },
        { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart;
            console.log('====================================');
            console.log(cart[0],cart[0]&&cart[0].amount);
            console.log('====================================');
            let array = cart.map(item => {
                return item.id
            })

            Product.find({ '_id': { $in: array } })
                .populate('user')
                .exec((err, cartDetail) => {
                    console.log('===================cart  detail=================');
                    console.log(cartDetail);
                    console.log('====================================');
                    return res.status(200).json({
                        cartDetail,
                        cart
                    })
                })
        }
    )
}

userController.removeCart = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
                { "cart": {  } }
        },
        { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })

            Product.find({ '_id': { $in: array } })
                .populate('user')
                .exec((err, cartDetail) => {
                    return res.status(200).json({
                        cartDetail,
                        cart
                    })
                })
        }
    )
}

userController.userCartInfo= async (req, res) => {
   

    await    User.findOne(
        { _id: req.user._id },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })

            Product.find({ '_id': { $in: array } })
                .populate('owner')
                .exec( (err, cartDetail) => {
                    
                    if (err) return res.status(400).send(err);
                    return res.status(200).send({ success: true, cartDetail, cart })
                })

        }
    )
}

userController.test = async (req, res) => {
    await new Order(
        {
            products: [{
                product: "5ee39ad707d185258b6b4696",
                amount: 3
            },{
                product: "5ee39ad707d185258b6b4696",
                amount: 3
            }],
            status: "Pending",
            customer: "5eecaf2197167b16ae927edd",
            service: "5ee810c50365db49dececf99",
            to: {
                street: "qaraqoul",
                city: "cairo",
                area: "abbasia",
                longitude: 1.25,
                latitude: 1.25
            },
            from: {
                street: "qaraqoul",
                city: "cairo",
                area: "abbasia",
                longitude: 1.25,
                latitude: 1.25
            },
            item: "adidas shoessssss",
            amount: 5,
            rate: {
                rating: 1,
                reviews: []
            },
            cost: 1000,
            description: "adidas shoes red colorrrrrrr",
            targetedServiceOwners: []
        }).save()
    res.send('done')
}
module.exports = userController;