const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'Not authorized, no token'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        console.log('Token Authorised'); 
        next();
    } catch (error) {
        return res.status(401).json({message: 'Not authorized, token failed'});
    }
});

module.exports = validateToken;