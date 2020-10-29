const passport = require('passport'), 
    LocalStrategy = require('passport-local').Strategy,
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt,
    eWallet = require('../models/models');
passport.use(
    'login',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        async (email, password, done) => {
            // return done(null, false, {message: 'Nothing to say'})
            try {

                const user = await eWallet.findOne({ email });

                if (!user) {
                    return done(null, false, { 'message': 'Email not found' })
                }
                
                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { 'message': 'Wrong Password' })
                }
                return done(null, user, { message: 'Logged in Successfully' })
            } catch (error) {
                return done(error);
            }
        })
)

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'TOP_SECRET',
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('api_token')
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);