const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {

    //TODO RETRIEVE THE TOKEN FROM THE LOGGED USER
    //(idea: Saving in the backend at the login request the token and reference it here)
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = {
    authenticate
}