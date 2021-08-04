const { exec } = require("child_process");
const convert = require('ansi-to-html');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const viewsPath = "/views";

app.use(express.static(__dirname + '/assets'));

const ansi_convert = new convert({
    fg: '#e6e6e6',
    bg: '#353535',
    newline: true,
    escapeXML: true,
    stream: false
});

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + viewsPath + '/index.html'));
});

router.get('/api', function(req, res) {

    let address = req.query.address;
    let type = req.query.type;

    console.log(address);
    console.log(type);
    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (address && type) {

        var cmd = "solc-select 0.6.12 && slither /home/ethsec/backend/SafuYield.sol --print " + type.trim();

        if (type == "full-scan") {
            var cmd = "solc-select 0.6.12 && slither /home/ethsec/backend/SafuYield.sol";
        }

        var child = exec(cmd, function(error, stdout, stderr) {

            var result = (error + stdout + stderr);

            // Replace empty spaces
            result = result.replace(/ /g, '\u00a0\u00a0');
            console.log(result);

            // Convert to HTML
            result = ansi_convert.toHtml(result);

            // Add some custom CSS classes
            result = result.replace(/-/g, '<span class="bigchar">-</span>');

            console.log(result);
            res.end(result + '\n');
        });

    } else {
        var result = '{"stdout":"' + '' + '","stderr":"' + 'BSC address and type is mandatory' + '","address":"' + address + '"}';
        res.end(result + '\n');
    }
    //res.sendFile(path.join(__dirname + viewsPath + '/api.html'));
});

// Add the router
app.use('/', router);
app.listen(process.env.port || 8080);

console.log('Running at Port 8080');

/*
var http = require('http'),
    url = require('url'),
    convert = require('ansi-to-html'),
    exec = require('child_process').exec;

var ansi_convert = new convert({
    fg: '#e6e6e6',
    bg: '#353535',
    newline: true,
    escapeXML: true,
    stream: false
});

var host = "0.0.0.0",
    port = "8080",
    thisServerUrl = "http://" + host + ":" + port;

http.createServer(function(req, res) {
    req.addListener('end', function() {

    });
    var parsedUrl = url.parse(req.url, true);
    var address = parsedUrl.query['address'];
    var type = parsedUrl.query['type'];

    console.log("BSC address to check is: " + address)
    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (address && type) {

        var cmd = "solc-select 0.6.12 && slither /home/ethsec/backend/SafuYield.sol --print " + type.trim();
        var child = exec(cmd, function(error, stdout, stderr) {

            var result = (error + stdout + stderr);

            // Replace empty spaces
            result = result.replace(/ /g, '\u00a0\u00a0');
            console.log(result);

            // Convert to HTML
            result = ansi_convert.toHtml(result);

            // Add some custom CSS classes
            result = result.replace(/-/g, '<span class="bigchar">-</span>');

            console.log(result);
            res.end(result + '\n');
        });

    } else {
        var result = '{"stdout":"' + '' + '","stderr":"' + 'BSC address and type is mandatory' + '","address":"' + address + '"}';
        res.end(result + '\n');
    }
}).listen(port, host);
console.log('Server running at ' + thisServerUrl);

*/