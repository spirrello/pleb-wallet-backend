const router = require('express').Router();
const authenticate = require("../routers/middleware/authenticate");
const authenticateAdmin = require("../routers/middleware/authenticateAdmin");

const {
    getBalance,
    createInvoice,
    getChannelBalance,
    payInvoice,
} = require("../lnd.js");

router.get("/balance", (req, res) => {
    getBalance().then((balance) => {
        res.status(200).json(balance);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.get("/channelbalance", (req, res) => {
    getChannelBalance().then((channelBalance) => {
        res.status(200).json(channelBalance);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.get("/invoices", (req, rescv) => {
    res.status(200).json({
        message: "I'm alive"
    });
});

// Create an invoice
router.post("/invoice", authenticate, (req, res) => {
    const { value, memo } = req.body;

    createInvoice({
        value, memo
    }).then((invoice) => {
        res.status(200).json(invoice);
    }).catch((err) => {
        res.status(500).json(err);
    });

});

// Pay an invoice
router.post("/pay", authenticateAdmin, async (req, res) => {
    const { payment_request } = req.body;

    const pay = await payInvoice({
        payment_request
    });

    if (pay.payment_error) {
        res.status(500).json(pay.payment_error);
    };

    if (pay?.payment_route) {
        // Save to DB

        res.status(200).json(pay);
    };
});

module.exports = router;
