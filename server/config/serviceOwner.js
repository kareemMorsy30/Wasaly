const jwt = require('jsonwebtoken');
const User = require('../models/user');


const serviceOwner = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decode = jwt.verify(token, process.env.secret);
    const user = await User.findById(decode._id);
    console.log('====================================');
    console.log(!user.role === "serviceowner");
    console.log('====================================');
    if (!(user.role==="serviceowner")) throw new Error();
    req.user=user
    next();
  } catch (error) {
    res.status(401).send({ message: "UnAuthorized it is an serviceowner Area" });
  }
};

module.exports = serviceOwner;