const jwt = require('jsonwebtoken');
const User = require('../models/user');


const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decode = jwt.verify(token, process.env.secret);
    const user = await User.findById(decode._id);
    if (!(user.role==="admin")) throw new Error();
    next();
  } catch (error) {
    res.status(401).send({ message: "UnAuthorized it is an admin Area" });
  }
};

module.exports = adminAuth;
/**
 * const AAuth = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decode = jwt.verify(token, process.env.secret);
      const user = await User.findById(decode._id);
      console.log('====================================');
      console.log("USER",user);
      console.log('====================================');
      if (!(user.role==="customer")) throw new Error();
      req.user = user;

      req.token = token;

      next();
    } catch (error) {
      res.status(401).send({ message: "UnAuthorized" });
    }
  };
  

 */