const jwt = require("jsonwebtoken");

// Exporting a middleware funcdtion that takes the arguments req, res and next
module.exports = (req, res, next) => {

    const token = req.headers.authorization;

    const secret = process.env.JWT_SECRET;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({
                    message: "Not allowed", Error: err
                });
            } else {
                // If the token is verified, execute the next middleware or endpoint logic
                next();
            }
        });
    } else {
        res.status(401).json({
            message: "No token!"
        });
    }

};
