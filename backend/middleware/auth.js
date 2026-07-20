const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect  = async (req, res, next) => { 
    try {
        //check token exists in header
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'No token, access denied'
            })
        }

        //Extract token
        const token = authHeader.split(' ')[1];
        //verify token - throws error if expired or tampered
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        //Find user and attach to request
        const user = await User.findById(decoded.id);
        if(!user) {
            return res.status(401).json({
                message: 'User no longer exists'
            })
        }
        req.user = user; //now available in all downstream route handlers
        next();

    } catch(err) {
       //jwt.verify throws if token is invalid or expired
       res.status(401).json({
        message: 'Token invalid or expired'
       }) 
    }
}

module.exports = protect;