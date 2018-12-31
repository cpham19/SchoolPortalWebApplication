const passport = require('passport')
const User = require('./models/User')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || 'secret'
    },
    async function(jwtPayload, done) {
        try {
            const user = await User.findUserById({_id: jwtPayload._id})

            // Return error if user does not exist
            if (!user) {
                return done(new Error(), false)
            }
            
            // Return user object if exists
            return done(null, user)
        }
        catch(err) {
            return done(new Error(), false)
        }
    })
)

module.exports = null