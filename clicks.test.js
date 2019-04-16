const getData = require('./index').getData;
const getHour = require('./index').getHour;
const byHour = require('./index').byHour;
const maxClick = require('./index').maxClick;
const R = require('ramda');

describe('clicks test', () => {
  

    beforeEach(() => {
       
      });

   
    test('it works', async () => {
      const data = await getData();
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBeTruthy();
    });

    //For each IP within each one hour period, only the most expensive click is placed into the result set.
    test('get hour object',  () => {
        const res =  getHour( {timestamp:"3/11/2016 02:02:58"});
        expect(res).toBe(2);

        const res2 =  getHour( {timestamp:"3/11/2016 04:12:22"});
        expect(res2).toBe(4);
        
      });

      test('get list group by hour',  async () => {
        const data = await getData();

        const res =  byHour(data);
        expect(res).toBeTruthy();

        console.log('**** Grouped object *****');
        //console.log(res);
        
      });

      test('get new max click',   () => {
        const res = maxClick([
            {
                id: 0,
                amount : 1
            },
            {
                id: 1,
                amount : 3.5
            },
            {
                id: 2,
                amount : 3.4
            }
        ]);
        expect(res.id).toBe(1);
        
      });

      test('get new max tie most expensive get get the earliest',   () => {
        const res = maxClick([
            {
                id: 0,
                amount : 3.5,
                timestamp:"3/11/2016 07:02:54"
            },
            {
                id: 1,
                amount : 3.5,
                timestamp:"3/11/2016 08:02:54"
            },
            {
                id: 2,
                amount : 4,
                timestamp:"3/11/2016 09:02:54"
            }
        ]);
        expect(res.ip).toBe(1);
        
      });
   
  })