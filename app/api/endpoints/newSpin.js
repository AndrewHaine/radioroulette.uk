const path = require('path');
const fs = require('fs');
const csvParse = require('csv-parse/lib/sync');
const getRandomInt = require('../../lib/random/getRandomInt');

module.exports = async (ctx) => {
  const stationsData = fs.readFileSync(path.join(__dirname, '../../../data/stations/stations.csv'));
  const stations = csvParse(stationsData, {
    columns: true,
    skip_empty_lines: true
  });

  const stationsSelection = Array(8).fill().map(() => {
    const stationsIndex = getRandomInt(stations.length);
    return stations[stationsIndex];
  });

  const Spin = ctx.model('Spin');
  const newSpin = new Spin({
    date: ctx.request.body.date,
    result: stationsSelection[0]['Name']
  });

  await newSpin.save();

  ctx.body = stationsSelection;
};
