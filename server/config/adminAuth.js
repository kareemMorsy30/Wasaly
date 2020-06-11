const jwt = require('jsonwebtoken');
const User = require('../models/user');


const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decode = jwt.verify(token, process.env.secret);
    const user = await User.findById(decode._id);
    if (!user.isadmin) throw new Error();
    next();
  } catch (error) {
    res.status(401).send({ message: "UnAuthorized it is an admin Area" });
  }
};

module.exports = adminAuth;