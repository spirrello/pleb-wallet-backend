const router = require('express').Router();
const authenticate = require("../routers/middleware/authenticate");
const authenticateAdmin = require("../routers/middleware/authenticateAdmin");

router.get("/balance", (req, res) => {
    res.status(200).json({
        message: "I'm alive"
    });
});

router.get("/invoices", (req, res) => {
    res.status(200).json({
        message: "I'm alive"
    });
});

// Create an invoice
router.post("/invoice", authenticate, (req, res) => {
    const { value, memo } = req.body;

    console.log(value, memo);

    res.status(200).json({ message: "I'm alive" });
})

// Pay an invoice
router.post("/pay", authenticateAdmin, (req, res) => {
    const { payment_request } = req.body;

    console.log(payment_request);

    res.status(200).json({ message: "I'm alive" });
});

module.exports = router;
