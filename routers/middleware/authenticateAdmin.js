const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const token = req.headers.authorization;

    const secret = process.env.JWT_SECRET;

    if (token) {
        jwt.verify(token, secret, async (err, decodeToken) => {
            if (err || !decodeToken) {
                res.status(401).json({
                    message: "error with your admin verification"
                });
            }
            else {
                // Get user from DB, this is a placeholder
                const user = {
                    username: "test",
                    password: "pass1",
                    adminKey: 1234,

                };

                // Extracting admin key from user object if it exists
                const adminKey = user?.adminKey?.toString() ?? "";

                if (adminKey !== process.env.ADMIN_KEY) {
                    res.status(401).json({
                        message: "must be an admin"
                    });
                } else {
                    next();
                }
            }
        })
    } else {
        res.status(401).json({
            message: "no token!"
        });
    }

}
