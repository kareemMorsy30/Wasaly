const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');



module.exports = (passport) => {
    //tokens from berrar auth
    let config = {};
    config.secretOrKey = process.env.secret;
    config.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    //from jwtPayload we can reach the token it self as we did in controller :{ _id: user._id } this is the Payload
    passport.use(new jwtStrategy(config, async (jwtPayload, done) => { //done may ve like next but it pass the error 
        try {       

            const user = await User.findById(jwtPayload._id);
            
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);

            }
        } catch (error) {
            return done(error, false);

        }
    }));
}

