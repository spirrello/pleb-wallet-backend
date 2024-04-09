const LndGrpc = require('lnd-grpc');
const dotenv = require('dotenv');

dotenv.config();

const options = {
    host: process.env.LND_NODE,
    cert: process.env.CERT,
    macaroon: process.env.ADMIN_MACAROON,
};

const lnd = new LndGrpc(options);

const connect = async () => {
    try {
        await lnd.connect();
        if (lnd.state !== "active") {
            throw new Error("LND did not reach 'active' state within the expected time");
        }

        console.log(`LND gRPC connection state: ${lnd.state}`);
    } catch (e) {
        console.log("error", e);
    }
};


const getBalance = async () => {
    const balance = await lnd.services.Lightning.walletBalance();
    return balance;
};

const getChannelBalance = async () => {
    const channelBalance = await lnd.services.Lightning.channenlBalance();
    return channelBalance;
};


module.exports = { connect, getBalance, getChannelBalance };
