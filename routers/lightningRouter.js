const router = require('express').Router();

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

router.post("/invoice", (req, res) => {
    const { value, memo } = req.body;

    console.log(value, memo);

    res.status(200).json({ message: "I'm alive" });
})

router.post("/pay", (req, res) => {
    const { payment_request } = req.body;

    console.log(payment_request);

    res.status(200).json({ message: "I'm alive" });
});

module.exports = router;
