const axios = require('axios');
const assert = require('assert');
const chance = require('chance');
const store = require('../helper/store.js');

const { aaxios, token } = require('../helper/helper.js');
const { generateGridMeter } = require('../../generators/meter.js');

async function create_meter(localpool_id, data) {
  try {
    const res = await (await aaxios()).post(`${process.env.URL}/api/admin/localpools/${localpool_id}/meters`, data);
    assert.equal(res.status, 201);
    return res.data;
  } catch (e) {
    console.log(data)
    console.log("data: %j", e.response.data);
    throw e;
  }
}

describe('api', function() {
  describe('meter', function() {
    it('should create a grid meter', async function() {
      let id = store.get('people_power_testgroup_id');
      let meter = generateGridMeter();
      const res = await create_meter(id, meter);
      store.store('people_power_testgroup_grid_meter');
    });
  });
});
