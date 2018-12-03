// fullstory proxy
//
// GET https://fullstory.com/s/fs.js
// POST https://rs.fullstory.com/rec/page
// POST https://rs.fullstory.com/rec/bundle?...

const Proxy = require('http-proxy-middleware');
const zlib = require('zlib');
const etl = require('etl');

const createProxy = req => Proxy({
    target: (req.method === 'POST') ? 'https://rs.fullstory.com' : 'https://fullstory.com',
    headers: { host: (req.method === 'POST') ? 'https://rs.fullstory.com' : 'https://fullstory.com' },
    secure: false,
    changeOrigin: true,
    ws: true,
    logLevel: 'debug',
    // modify GET requests (for the javascript file - remove rs. subdomain)
    onProxyRes: (req.method === 'POST') ? () => { } : async (proxyRes, req, res) => {
      res.type('application/javascript');
      res.set({ 'content-encoding': 'gzip' });
      let body = await proxyRes.pipe(zlib.createGunzip()).pipe(etl.map()).promise();
      body = body.join('').replace(/rs\."/g,'"');
      const z = zlib.createGzip();
      z.end(body);
      z.pipe(res);
    },
    selfHandleResponse: (req.method === 'POST') ? false : true
  });

module.exports = (req,res,next) => createProxy(req)(req,res,next);
