require('dotenv').config();
require('@babel/register');
const https = require('https');
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const mongoose = require('@south-paw/koa-mongoose');
const Pug = require('koa-pug');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const Router = require('./router');
const Renderer = require('../renderer');
const Schemas = require('../database/schemas');

const app = new Koa();

app.use(mongoose({
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  db: process.env.DB_NAME,
  schemas: Schemas
}));

app.use(cors());

app.use(bodyParser());

const pug = new Pug({
  viewPath: path.resolve(__dirname, '../../content/templates'),
  locals: { currentTime: new Date() },
  app
});

app.use(async (ctx, next) => {
  try {
    await next()

    if (ctx.status === 404) ctx.throw(404)
  } catch (err) {
    console.error(err);
    ctx.response.status = ctx.status;
    return Renderer.notFound(ctx);
  }
});

app.use(Router.routes());

const serverCallback = app.callback();
const httpsServer = https.createServer({
  key: fs.readFileSync(process.env.SSL_KEY),
  cert: fs.readFileSync(process.env.SSL_CERT)
}, serverCallback);

module.exports = httpsServer;
