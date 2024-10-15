const authMiddleware = (req, res, next) => {
    // check if token is there 
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.redirect('/login'); 
    }

    next();
};

module.exports = authMiddleware;
