const passport = require('passport');

const Auth = (router, middleware = (req, res, next) => next()) => {
    router.all('*', middleware, (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err || !user) {
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
}

module.exports = {
    Auth
}