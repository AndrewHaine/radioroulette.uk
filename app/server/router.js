const Router = require('@koa/router');
const koaSend = require('koa-send');
const router = new Router();

const API = require('../api');
const Renderer = require('../renderer');

// Static content routes
router.get('/content/(.*)', async (ctx) => koaSend(ctx, ctx.path));
router.get('/favicon.ico', async (ctx) => koaSend(ctx, ctx.path));

// API Routes
router.get('/api/v1/spinCount', API.spinCount);
router.post('/api/v1/newSpin', API.newSpin);

// Website routes
router.get('/', Renderer.index);
router.get('/about', Renderer.about);
router.get('/privacy', Renderer.privacy);

module.exports = router;
