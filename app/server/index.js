require('dotenv').config();
require('@babel/register');
const https = require('https');
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const Pug = require('koa-pug');

const app = new Koa();

app.use(serve('content'));

const pug = new Pug({
  viewPath: path.resolve(__dirname, '../../content/templates'),
  locals: { currentTime: new Date() },
  app
});

app.use(async ctx => {
  await ctx.render('index');
});

const serverCallback = app.callback();
const httpsServer = https.createServer({
  key: fs.readFileSync(process.env.SSL_KEY),
  cert: fs.readFileSync(process.env.SSL_CERT)
}, serverCallback);

module.exports = httpsServer;
