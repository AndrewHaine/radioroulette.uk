const startOfDay = require('date-fns/startOfDay');

module.exports = async (ctx) => {
  const Spin = ctx.model('Spin');
  const count = await Spin.countDocuments({});
  const todayCount = await Spin.countDocuments({
    "date": {
      "$gte": startOfDay(new Date())
    }
  });
  ctx.body = { allTime: count, today: todayCount };
}
