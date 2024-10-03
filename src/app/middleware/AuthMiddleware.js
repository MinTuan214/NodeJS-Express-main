const jwt = require('jsonwebtoken');

const middlewareAuth = {
    authenticateToken: (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect('/');
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.redirect('/');
            }

            req.user = user;
            next();
        });
    },
    getUserInfo: (req, res) => {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
            }

            return res.json({ name: user.name });
        });
    },
    getIduser: (req, res) => {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
            }
            return res.json({ id: user._id });
        });
    }
}

module.exports = middlewareAuth;