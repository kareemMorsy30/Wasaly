const User = require("../models/user");
const allModels = require('../models/allModels');
const userModel = require('../models/user');
const jwt = require("jsonwebtoken");
let userController = {};
userController.regesiter = async (req, res, next) => {
    const { name, username, email, password, role, phones, address, image_path } = req.body;
    console.log(role)
    const newUser = new User({
        name, username, email, password, phones, role, address, image_path
    });

    if(newUser.role==="admin"){
        console.log("Are you mad ??? ");

        res.send({message:"You Are Not Allowrd to be an Admin "})
    }
    if (newUser._id != undefined && newUser.role === "customer") {
        try {
            console.log("\n  new USER :::     ", newUser);
            // if (newUser.role=="customer"){
            const user = await newUser.save();
            console.log("\n USER ::    :      :    ".user);
            return res.send({ user });

        }
        catch (error) {
            if (error.name === "MongoError" && error.code === 11000) {
                next(new Error("email must be unique"));
            } else {
                next(error);
            }
        }
    }

    else if (newUser.role === "serviceowner") {
        const { user, distance, region, transportation } = req.body;
        await newUser.save();

        const newServiceOwner = new allModels.ServiceOwner({
            user: newUser._id, distance, region, transportation
        });
        console.log("\n  new USER :::     ", newUser.role);
        try {
            const serviceOwner = await newServiceOwner.save();
            console.log("\n Service owner ::    :      :    ".serviceOwner);
            console.log("i'm in role");
            return res.send({ serviceOwner, user });
        }
        catch (error) {
            if (error.name === "MongoError" && error.code === 11000) {
                next(new Error("email must be unique"));
            } else {
                next(error);
            }
        }
    }
    else if (newUser.role === "productowner") {
        const { user, marketName, ownerName, marketPhone } = req.body;
        await newUser.save();

        const newProductOwner = new allModels.productOwner({
            user: newUser._id, marketName, ownerName, marketPhone
        });
        console.log("\n  new  newProductOwner:::     ", newProductOwner.role);
        console.log("\n  new newProductOwner.user :::     ", newProductOwner.user);
        try {
            console.log("\n  new newProductOwner :::     ", newProductOwner);
            const productOwner = await newProductOwner.save();
            console.log("\n pOwner ::    :      :    ".productowner);
            console.log("i'm in role");
            res.send({ productOwner });
        } catch (error) {
            if (error.name === "MongoError" && error.code === 11000) {
                next(new Error("email must be unique"));
            } else {
                next(error);
            }
        }
    }
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
        // console.log("User", user);
        user.isPasswordMatch(password, user.password, (err, matched) => {
            if (matched) {
                //Generate jwt if credintials okay
                //secret
                const secret = process.env.secret;
                //expiration
                const expire = process.env.expirationDate;
                //for now just id but we can pass all the user object {sub:user._id}
                const token = jwt.sign({ _id: user._id }, secret, {
                    expiresIn: expire,
                });
                /**
                 * we will use this token with passport to make sure that the server can recognize the toke :)
                 */
                // request.headers.authorization = token;

                response.send({ token, user });
            } else {
                response.status(401).send({
                    error: "Invalid username or password",
                });
            }
        });
    } catch (error) {
        next(error);
    }
};

userController.getAllUsers = async(req,res)=>{
    try{
        let user =await userModel.find()
        console.log(user);
        res.send(user)
    }catch(err){
        console.log(err);
        res.send(err);
    }
}
userController.getUser = async(req,res)=>{
    try{
    let user =await userModel.findById({_id: req.params.id})
    res.send(user)
    }
    catch(err){
        res.send(err);
        console.log(err);
    }

}
userController.updateUser = (req,res)=>{
    userModel.findOneAndUpdate({_id: req.params.id},req.body,{new: true},(error,user)=>{
        res.status(200).json({"data": user});
    }).catch((err) => {
        console.log(err);
        res.status(400).json({"error": err});
    })
}

module.exports = userController;
/**
 *
 * {

    "phones": ["01097567990"],
    "name": "SHaBAN",
    "username": "SHaBAN",
    "email": "shshshs@gmail.com",
    "password": "12345678d",
    "role": "customer",
    "address": [{

        "street": "ss",
        "city": "ooooo",
        "area": "xsssx",
		"location":{"latitude":220,"longitude":220}
    }],
    "image_path": "axxx.png",
	"distance":2802,
	"region":"66",
	"transportation":"car"
 */


// {

    // "name":"adham",
    // "username":"ssadham",
    // "email": "adham@gmail.com",
    // "password": "12345678d",
    // "role": "customer",
    // "address": [{

    //     "street": "ss",
    //     "city": "ooooo",
    //     "area": "xsssx",
	// 	"location":{"latitude":220,"longitude":220}
    // }],
    // "image_path": "axxx.png",
	// "marketName":"sports",
    // "ownerName": "adham" ,
    // "marketPhone": "01143632151"
// }