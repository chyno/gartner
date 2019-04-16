const getData = require('./index').getData;

describe('clicks test', () => {
    test('it works', async () => {
      const data = await getData();
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBeTruthy();
    });
   
  })