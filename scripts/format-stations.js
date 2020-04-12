const path = require('path');
const fs = require('fs');
const csvParse = require('csv-parse');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const getColors = require('get-image-colors');

const STATIONS_FILE = path.join(__dirname, '../data/stations/stations.csv');

const readStream = fs.createReadStream(STATIONS_FILE);

let csv = [];
const csvStream = csvParse({ columns: true });

const csvWriter = createCsvWriter({
  path: STATIONS_FILE,
  header: [
    {id: 'Name', title: 'Name'},
    {id: 'URL', title: 'URL'},
    {id: 'Frequency', title: 'Frequency'},
    {id: 'Region', title: 'Region'},
    {id: 'Station_Type', title: 'Station_Type'},
    {id: 'Image', title: 'Image'},
    {id: 'Color', title: 'Color'}
  ]
});

csvStream.on("data", async (row) => {

  // Get the most promenant colour from the image file
  if(!!row['Image']) {
    const imageBuffer = fs.readFileSync(path.join(__dirname, `../${row['Image']}`));
    try {
      const colors = await getColors(imageBuffer, 'image/png');
      row['Color'] = colors[1].css();
    } catch (err) {
      console.log(`Error parsing the image color for ${row['Image']}`, err, (err && err.stack));
    }
  }

  csv.push(row);
});

csvStream.on('end', () => {
  csvWriter.writeRecords(csv)
    .then(() => {
      console.log('Stations file written successfully!');
    })
    .catch(err => {
      console.error('Error writing CSV: ', err, (err && err.stack));
    });
});

try {
  readStream.pipe(csvStream);
} catch (err) {
  console.error('Error parsing CSV', err, (err && err.stack));
}
