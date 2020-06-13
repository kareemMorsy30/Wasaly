const jwt = require('jsonwebtoken');
const User = require('../models/user');


const productOwner = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decode = jwt.verify(token, process.env.secret);
    const user = await User.findById(decode._id);
    console.log('====================================');
    console.log(!user.role === "productowner");
    console.log('====================================');
    if (!(user.role==="productowner")) throw new Error();
    next();
  } catch (error) {
    res.status(401).send({ message: "UnAuthorized it is an productowner Area" });
  }
};

module.exports = productOwner;