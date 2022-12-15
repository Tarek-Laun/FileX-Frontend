const https = require('node:https');
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const port = 443;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
    key: fs.readFileSync('Certificate/Key.pem'),
    cert: fs.readFileSync('Certificate/Cert.pem'),
    ca: fs.readFileSync('Certificate/Ca.pem'),
    requestCert: true,
    rejectUnauthorized: true
};

app.prepare().then(() => {
    https.createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port, (err) => {
        if (err) throw err;
        console.log("ready - started server on url: https://localhost:" + port);
    });
});