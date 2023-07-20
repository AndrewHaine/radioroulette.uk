const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse/sync');
const { createObjectCsvWriter } = require('csv-writer');
const getColors = require('get-image-colors');

const STATIONS_FILE = path.join(__dirname, '../../data/stations/stations.csv');

let csv = parse(fs.readFileSync(STATIONS_FILE), {
  columns: true
});

const getRowColor = async (row) => {
  if(!!row['Image']) {
    const imageFile = path.join(__dirname, '../../public' + row['Image']);
    const colors = await getColors(imageFile, { count: 1 });

    row['Color'] = colors[0].css() || 'rgb(255,255,255)';

    return row;
  }
};

const csvWriter = createObjectCsvWriter({
  path: STATIONS_FILE,
  header: [
    {id: 'Name', title: 'Name'},
    {id: 'URL', title: 'URL'},
    {id: 'Frequency', title: 'Frequency'},
    {id: 'Region', title: 'Region'},
    {id: 'Station_Type', title: 'Station_Type'},
    {id: 'Image', title: 'Image'},
    {id: 'Color', title: 'Color'},
    {id: 'Description', title: 'Description'}
  ]
});

const getRows = async () => {
  return Promise.all(csv.map(row => getRowColor(row)));
}

getRows().then(data => {
  csvWriter.writeRecords(data);
})
