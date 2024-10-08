const jwt = require('jsonwebtoken');

const middlewareAuth = {
    authenticateToken: (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            return res.json('Error token');
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.json('Error token');
            }
            req.user = user;
            next();
        });
    },
}

module.exports = middlewareAuth;