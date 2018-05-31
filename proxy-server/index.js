const fs = require('fs');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
  target: {
    protocol: 'https:',
    host: process.env.PROXY_TARGET || 'fullstory.com',
    port: 443
  },
  ssl: {
    key: fs.readFileSync(`/etc/letsencrypt/live/${process.env.PROXY_DOMAIN}/privkey.pem`),
    cert: fs.readFileSync(`/etc/letsencrypt/live/${process.env.PROXY_DOMAIN}/fullchain.pem`)
  },
  changeOrigin: true
});

proxy.on('error', e => console.log(e));

proxy.listen(5555);

console.log('proxy-server listening on port 5555');
process.send('ready'); // signal ready for `pm2 start index.js --wait-ready`
