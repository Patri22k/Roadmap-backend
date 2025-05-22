const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
const { SECRET_KEY } = require("../config/secrets");

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
};

module.exports = authenticate;