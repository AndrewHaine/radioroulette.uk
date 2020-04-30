const templates = require('./templates');

exports.index = async (ctx) => {
  const { template, title, description } = templates['/'];
  await ctx.render(template, {
    title,
    description
  });
}

exports.about = async (ctx) => {
  const { template, title, description } = templates['/about'];
  await ctx.render(template, {
    title,
    description
  });
}

exports.privacy = async (ctx) => {
  const { template, title, description } = templates['/privacy'];
  await ctx.render(template, {
    title,
    description
  });
}

exports.notFound = async (ctx) => {
  const { template, title, description } = templates['/404'];
  await ctx.render(template, {
    title,
    description
  });
}
