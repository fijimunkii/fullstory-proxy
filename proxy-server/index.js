const fs = require('fs');
const path = require('path');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
  target: {
    protocol: 'https:',
    host: 'fullstory.com',
    port: 443
  },
  ssl: {
    key: fs.readFileSync(path.join(__dirname,'cert/ssl.key')),
    cert: fs.readFileSync(path.join(__dirname,'cert/ssl.crt'))
  },
  changeOrigin: true
});

proxy.on('error', e => console.log(e));

proxy.listen(5555);

console.log('proxy-server listening on port 5555');
process.send('ready'); // signal ready for `pm2 start index.js --wait-ready`
