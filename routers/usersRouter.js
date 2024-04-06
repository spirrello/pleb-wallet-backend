const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

router.get("/", (req, res) => {
    res.status(200).json({
        message: "lots of users!"
    });
});

router.post("/login", (req, res) => {
    const { id, password } = req.body;


    console.log(id, password);

    res.status(200).json({ message: "users!" });
});


router.get("/user", (req, res) => {
    const id = req.params.id;

    console.log(id);

    res.status(200).json({ message: "users!" });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    console.log(id);

    res.status(200).json({ message: "users!" });
});

router.post("/register", (req, res) => {
    const { username, password } = req.body;

    console.log(username, password);

    res.status(201).json({ message: `${username}` });
});

// Update user
router.put("/:id", (req, res) => {
    const id = req.params.id;

    const user = req.body
    console.log(id, user);

    res.status(200).json({ message: "users!" });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    console.log(id);

    res.status(200).json({ message: "users!" });
});


function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        admin: user.admin,
    };

    const secret = process.env.JWT_SECRET || "Satoshi Nakamoto";

    const options = {
        expiresIn: "1d"
    };

    return jwt.sign(payload, secret, options);
}

module.exports = router;
