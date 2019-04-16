const loadJsonFile = require('load-json-file');
const R = require('ramda');


const mindate = new Date('1970-01-01Z00:00:00:000');

//Get the json data from file
async function getData() {
    let alldata = await loadJsonFile('clicks.json');
    return alldata;
    // let toRemove = geIpsToRemove(alldata);
    // return R.filter(x => toRemove.indexOf(x.ip) === -1, alldata);
}



// Aggregating and sorting functions
const maxClick = R.reduce(findMaxClick, { amount: -1, timestamp: mindate });
const byIP = R.groupWith(ipEqual);
const sortByIp = R.sortBy(R.compose(R.toLower, R.prop('ip')));

// Runner code - run async because we are getting data async
(async () => {
    try {
        var data = await getData();

        // List of ip to be removed - more than 10
        const ipsTobeRemoved = R.filter(x => geIpsToRemove(data).indexOf(x.ip) === -1);

        // Compose function
        let f = R.compose(
            R.reduce(createArrayHash, []),
            R.flatten,
            R.map(R.map(maxClick)),
            R.map(byIP),
            R.map(sortByIp),
            R.groupWith(hoursEqual),
            ipsTobeRemoved);

        // Call the function
        let res = f(data);

        // log answer
        console.log('Each hash in the array has format - [period]_[ip]:{... click object}');
        console.log(JSON.stringify(res));
    } catch (e) {
        console.error(e);
        // Deal with the fact the chain failed
    }
})();


// Export these for my unit tests
//module.exports = { getData, byHour: byHour, maxClick, geIpsToRemove };


// ************** Helper functions **************************************/

function createArrayHash(acc, item) {
    let month = (new Date(item.timestamp)).getHours() + 1;
    let ip = item.ip;
    let obj = {};
    obj[month + '_' + ip] = item;
    acc.push(obj)
    return acc;

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
                if (toRemove.indexOf(property) === -1) {
                    //    console.log('do not show this ***  - ' + property);
                    toRemove.push(property);
                }
            }

        }
    }
    return toRemove;
}