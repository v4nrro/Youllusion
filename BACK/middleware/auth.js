const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
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

//TODO TEST THIS
const role = (roles) => {
    return (req, res, next) => {
        if(roles.includes(req.user.role)) {
            next();
        }
        else {
            return res.status(403).json({ message: 'Permission denied' });
        }
    }
};

module.exports = {
    authenticate,
    role
}