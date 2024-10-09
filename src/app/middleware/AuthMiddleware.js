const jwt = require('jsonwebtoken');

const middlewareAuth = {
    authenticateToken: (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Token not found' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = user;
            next();
        });
    },
}

module.exports = middlewareAuth;