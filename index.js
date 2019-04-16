const loadJsonFile = require('load-json-file');


//The result set should be stored in an array of hashes. Each hash should represent a click. T
async function getData() {
   return await loadJsonFile('clicks.json');
}

module.exports = { getData};