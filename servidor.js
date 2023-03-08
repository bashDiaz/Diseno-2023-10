const dgram = require('dgram');
const server = dgram.createSocket('udp4');

let info = [];

server.on('message', (msg, rinfo) => {
  const data = msg.toString();
  const fields = data.split(';');
  info = fields;
});

server.on('listening', () => {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.bind(1234);

const http = require('http');
const fs = require('fs');

const serverHttp = http.createServer((req, res) => {
  if (req.url === '/data') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(info.join(';'));
    res.end();
;
  } else {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(404);
        res.write('File not found!');
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
      }
    });
  }
});

serverHttp.listen(80, () => {
  console.log('HTTP server listening on port 80');
});
