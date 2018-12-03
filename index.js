process.setMaxListeners(0);

const fs = require('fs');
const express = require('express');
let app = express();
app.use(require('body-parser').json());
app.use(require('hpp')());

app.use('/', require('./proxy'));

app = require('https').createServer({
  key: fs.readFileSync(`/etc/letsencrypt/live/${process.env.DOMAIN}/privkey.pem`),
  cert: fs.readFileSync(`/etc/letsencrypt/live/${process.env.DOMAIN}/fullchain.pem`)
}, app);
app.listen(process.env.PORT)

process.send('ready'); // signal ready for `pm2 start index.js --wait-ready`
