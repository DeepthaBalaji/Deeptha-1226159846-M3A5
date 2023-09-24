const { default: fetch } = require('node-fetch'); // Import fetch using require

const apiUrl = 'https://swapi.dev/api/people/1';

fetch(apiUrl, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'User-Agent': '*'
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((jsonData) => {
    // Convert JSON to XML using xml2js
    const xml2js = require('xml2js');
    const builder = new xml2js.Builder();
    const xmlData = builder.buildObject(jsonData);

    // Write the XML data to a file
    const fs = require('fs');
    fs.writeFileSync('output.xml', xmlData);
    console.log('JSON to XML conversion completed. Output saved to output.xml');
  })
  .catch((error) => {
    console.error('Error', error);
  });
