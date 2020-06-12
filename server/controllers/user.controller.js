const User = require("../models/user");
const allModels = require('../models/allModels');
const jwt = require("jsonwebtoken");
let userController = {};
userController.regesiter = async (req, res, next) => {
    const { name, username, email, password, role, phones, address, image_path } = req.body;
    const newUser = new User({
        name, username, email, password, phones, role, address, image_path
    });
    if (newUser._id != undefined&& newUser.role==="customer") {
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

        const newServiceOwner = new allModels.ServiceOwner({
            user: newUser._id, distance, region, transportation
        });
        console.log("\n  new USER :::     ", newUser.role);
        try {
            //     console.log("\n  new USER :::     ",   newUser);
            // // if (newUser.role=="customer"){
            //     const user = await newUser.save();
            //     console.log("\n USER ::    :      :    ".user);
            //     return res.send({ user });

            //     console.log("i'm in role");
            //     console.log("\n  new Service OWenr :::     ",   newServiceOwner);
            // // }
            // if (user.role=="serviceowner"){

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

    else if(newUser.role==="productowner"){
         
    const { user, marketName, ownerName, marketPhone } = req.body;
    const newProductOwner=new allModels.productOwner({
     user:newUser._id, marketName, ownerName, marketPhone        
    });
 
 
     console.log("\n  new  newProductOwner:::     ", newProductOwner.role);
     console.log("\n  new newProductOwner.user :::     ", newProductOwner.user);
 
     try {
         console.log("\n  new newProductOwner :::     ", newProductOwner);
             const productOwner=await newProductOwner.save();
             console.log("\n pOwner ::    :      :    ".productowner);
             console.log("i'm in role");
             res.send({productOwner});
 
            //  console.log("it's not a PO");
            //  return res.send({ msg: "NOT NOT PO" });
 
         
 
     } catch (error) {
         if (error.name === "MongoError" && error.code === 11000) {
             next(new Error("email must be unique"));
         } else {
             next(error);
         }
     }
    }
    //  else if(newUser.role==="serviceowner"){
    // const { user,distance,region,transportation } = req.body;

    // const newServiceOwner = new  allModels.ServiceOwner ({
    //    user:newUser._id, distance,region,transportation
    //      });
    // console.log("\n  new USER :::     ",   newUser.role);
    // try {
    // //     console.log("\n  new USER :::     ",   newUser);
    // // // if (newUser.role=="customer"){
    // //     const user = await newUser.save();
    // //     console.log("\n USER ::    :      :    ".user);
    // //     return res.send({ user });

    // //     console.log("i'm in role");
    // //     console.log("\n  new Service OWenr :::     ",   newServiceOwner);
    // // // }
    //     // if (user.role=="serviceowner"){

    //         const serviceOwner = await newServiceOwner.save();
    //         console.log("\n Service owner ::    :      :    ".serviceOwner);
    //         console.log("i'm in role");
    //         if (serviceOwner.user===user._id) {
    //             console.log("ss");

    //         }
    //         return res.send({ serviceOwner,user });

    //     // return res.send({ user });
    // // }
    // // else{
    // //     console.log("it's not a customer");
    // //     return res.send({ msg:"NOT CUSTOMER" });
    // // }
    // }
    //  catch (error) {
    //     if (error.name === "MongoError" && error.code === 11000) {
    //         next(new Error("email must be unique"));
    //     } else {
    //         next(error);
    //     }


};


// userController.regesiterSO = async (req, res, next) => {
//     const { user, distance, region, transportation } = req.body;
//     user.role = "serviceowner";
//     const newServiceOwner = new allModels.ServiceOwner({
//         user, distance, region, transportation
//     });


//     console.log("\n  new Service Owner :::     ", user.role);
//     console.log("\n  new Service Owner.user :::     ", newServiceOwner.user);

//     try {
//         console.log("\n  new Service OWenr :::     ", newServiceOwner);
//         if (user.role == "serviceowner") {

//             const serviceOwner = await newServiceOwner.save();
//             console.log("\n Service owner ::    :      :    ".serviceOwner);
//             console.log("i'm in role");

//             return res.send({ serviceOwner });

//         } else {
//             console.log("it's not a Servi");
//             return res.send({ msg: "NOT CUSTOMER" });

//         }

//     } catch (error) {
//         if (error.name === "MongoError" && error.code === 11000) {
//             next(new Error("email must be unique"));
//         } else {
//             next(error);
//         }
//     }
// };




userController.regesiterPO = async (req, res, next) => {
   
    const { user, marketName, ownerName, marketPhone } = req.body;
   const newProductOwner=new allModels.productOwner({
    user:newUser._id, marketName, ownerName, marketPhone        
   });


    console.log("\n  new  newProductOwner:::     ", newProductOwner.role);
    console.log("\n  new newProductOwner.user :::     ", newProductOwner.user);

    try {
        console.log("\n  new newProductOwner :::     ", newProductOwner);
        if (user.role == "productowner") {
            const productOwner=await newProductOwner.save();
            console.log("\n pOwner ::    :      :    ".productowner);
            console.log("i'm in role");
            res.send({productOwner});

        } else {
            console.log("it's not a PO");
            return res.send({ msg: "NOT NOT PO" });

        }

    } catch (error) {
        if (error.name === "MongoError" && error.code === 11000) {
            next(new Error("email must be unique"));
        } else {
            next(error);
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