const loadJsonFile = require('load-json-file');
const R = require('ramda');

//The result set should be stored in an array of hashes. Each hash should represent a click. T
async function getData() {
   return await loadJsonFile('clicks.json');
}


 function getHour(obj) {
     return (new Date(obj.timestamp)).getHours();
 }

 function findMaxClick(curMax, curItem) {
     //timestamp
  if (curMax.amount === curItem.amount) {
      let maxDate = new Date(curMax.timestamp);
      let curDate = new Date(curItem.timestamp);

      return maxDate > curDate ? curMax : curItem;
  }
  if (curMax.amount > curItem.amount) {
      return curMax;
  }
  else {
    return curItem;
  }
 }

 // (a → String) → [a] → {String: [a]}
 const byHour = R.groupBy(getHour);

 // ((a, b) → a) → a → [b] → a
 const maxClick = R.reduce(findMaxClick, {amount: -1});


 // Export these for my unit tests
module.exports = { getData, getHour, byHour, maxClick};