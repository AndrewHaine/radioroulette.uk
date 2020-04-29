const templates = require('./templates');

exports.index = async (ctx) => {
  const { template, title } = templates['/'];
  await ctx.render(template, {
    title
  });
}

exports.about = async (ctx) => {
  const { template, title } = templates['/about'];
  await ctx.render(template, {
    title
  });
}
