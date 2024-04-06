const http = require('http');

function sendRequest() {
    const options = {
        host: 'localhost',
        port: 8080,
        path: '/health',
        method: 'GET'
    };


    const req = http.request(options, (res) => {
        console.log(`Response status code:  ${res.statusCode}`);
    });

    req.on('error', (e) => {
        console.error(`Request error: ${e.message}`);
    });

    req.end();
};

setInterval(sendRequest, 100);
