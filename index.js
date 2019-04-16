const loadJsonFile = require('load-json-file');
const R = require('ramda');

//Get the json data from file
async function getData() {
    let alldata = await loadJsonFile('clicks.json');
    return alldata;
    // let toRemove = geIpsToRemove(alldata);
    // return R.filter(x => toRemove.indexOf(x.ip) === -1, alldata);
}



function hoursEqual(obj1, obj2) {
    const hour1 = (new Date(obj1.timestamp)).getHours();
    const hour2 = (new Date(obj2.timestamp)).getHours();
    return (hour1 === hour2); //&& (obj1.ip === obj2.ip);
}

function ipEqual(obj1, obj2) {
    return obj1.ip === obj2.ip;
}


function findMaxClick(curMax, curItem) {
    //timestamp
    if (curMax.amount === curItem.amount) {
        let maxDate = new Date(curMax.timestamp);
        let curDate = new Date(curItem.timestamp);

        return maxDate < curDate ? curMax : curItem;
    }
    if (curMax.amount > curItem.amount) {
        return curMax;
    }
    else {
        return curItem;
    }
}


function geIpsToRemove(data) {
    let toRemove = [];
    const res = R.groupBy(x => {
        return x.ip;
    }, data);

    for (var property in res) {
        if (res.hasOwnProperty(property)) {

            if (res[property].length > 10) {
                console.log('do not show this  - ' + property);
                toRemove.push(property);
            }

        }
    }
    return toRemove;
}
// (a → String) → [a] → {String: [a]}
const byHour = R.groupWith(hoursEqual);


// ((a, b) → a) → a → [b] → a
const maxClick = R.reduce(findMaxClick, { amount: -1 });
const byIP = R.groupWith(ipEqual);


var sortByIp = R.sortBy(R.compose(R.toLower, R.prop('ip')));

(async () => {
    try {
        var data = await getData();
        
        const ipsTobeRemoved = R.filter(x => geIpsToRemove(data).indexOf(x.ip) === -1);

        let f = R.compose(
          R.flatten,
          R.map(R.map(maxClick)),
           R.map(byIP),
            R.map(sortByIp),
            byHour,
            ipsTobeRemoved);

        let res = f(data);
        console.log(JSON.stringify(res));
    } catch (e) {
        console.error(e);
        // Deal with the fact the chain failed
    }
})();


// Export these for my unit tests
module.exports = { getData, byHour: byHour, maxClick, geIpsToRemove };