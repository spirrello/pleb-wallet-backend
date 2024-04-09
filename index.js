// Import the Express library
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const { connect } = require("./lnd");

dotenv.config();

const usersRouter = require("./routers/usersRouter");
const lightningRouter = require("./routers/lightningRouter");


// Create a new instance of the Express server
const server = express()

server.use(helmet());
server.use(morgan("common"));
server.use(cors());
server.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, //15 minutes
        max: 100 // limit each IP to 100 requrests per windowMs
    }));
// Use the built-in JSON middleware to parse incoming JSON requests
server.use(express.json())
// Connec to LND nocde
connect();
// Set up a route to handle GET requests to the root path
server.get("/health", (req, res) => {
    // Send a JSON response with a "message" property set to "I'm alive!"
    res.status(200).json({ message: "I'm alive!" });
});


// Add our routers before server.listen()
server.use("/users", usersRouter);
server.use("/lightning", lightningRouter);


server.use('/things', function (req, res, next) {
    console.log("A request for things received at " + Date.now());
    next();
});


server.use('/things', function (req, res, next) {
    console.log("welcome home " + Date.now());
    next();
});

server.use('/things', function (req, res, next) {
    console.log("go home " + Date.now());
    next();
});


server.use('/things', function (req, res,) {
    res.send('Things');
});

const PORT = process.env.PORT || 8089;
server.listen(PORT, () => {
    // Log a message to the console when the server starts listening
    console.log(`Server listening on port ${PORT}`);
});
