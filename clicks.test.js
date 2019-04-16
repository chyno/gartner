const getData = require('./index').getData;
const maxClick = require('./index').maxClick;
const byIP = require('./index').byIP;
const geIpsToRemove = require('./index').geIpsToRemove;

const R = require('ramda');

describe('clicks test', () => {
  
    beforeEach(() => {
       
      });
   
    test('it can get data', async () => {
      const data = await getData();
      expect(data).toBeDefined();
     console.log(data);
      expect(Array.isArray(data)).toBeTruthy();
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

      test('get new max tick most expensive get get the earliest',   () => {
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
                amount : 2,
                timestamp:"3/11/2016 09:02:54"
            }
        ]);
        expect(res.id).toBe(0);
        
      });


      test('get ip per hour',   () => {
        const data =  [ { ip: '22.22.22.22', timestamp: '3/11/2016 02:02:58', amount: 7 },
        { ip: '11.11.11.11',
          timestamp: '3/11/2016 02:12:32',
          amount: 6.5 },
        { ip: '11.11.11.11',
          timestamp: '3/11/2016 02:13:11',
          amount: 7.25 },
        { ip: '44.44.44.44',
          timestamp: '3/11/2016 02:13:54',
          amount: 8.75 } ];

        const res = byIP(data);

        expect(res).toBeTruthy();

        //   console.log('**** Grouped object *****');
        //    console.log(res);
        
      });

      test('filter ips ',  async () => {
        const data =   await getData();

        const res =  geIpsToRemove(data);

        
        expect(res).toBeTruthy();

        // console.log('**** To be removed *****');
       // console.log(res);
        
      });
   
  })