const axios =  require('axios');
const assert = require('assert');
const chance = require('chance');
const { generate_address } = require('../../generators/address.js');
const { generate_person, generate_organization } = require('../../generators/person.js');

const { aaxios, token } = require('../helper/helper.js');
const store = require('../helper/store.js');

async function create_localpool(data) {
  try {
    const res = await (await aaxios()).post(`${process.env.URL}/api/admin/localpools`, data);
    assert.equal(res.status, 201);
    return res.data;
  } catch (e) {
    throw e;
  }
}

async function create_organization_owner(id, data) {
  try {
    const res = await (await aaxios()).post(`${process.env.URL}/api/admin/localpools/${id}/organization-owner`, data);
    assert.equal(res.status, 201);
    return res.data;
  } catch (e) {
    throw e;
  }
}

async function assign_gap_contract_customer(localpool_id, customer_id) {
  try {
    const res = await (await aaxios()).post(`${process.env.URL}/api/admin/localpools/${localpool_id}/organization-gap-contract-customer/${customer_id}`, {});
    assert.equal(res.status, 201);
    return res.data;
  } catch (e) {
    throw e;
  }
}

describe('api', function() {
  describe('localpool', function() {
    describe('create', function() {
      it('should not create a new pool with missing data', async function() {
        try {
          await create_localpool({});
          throw 'Should not create';
        } catch (e) {
          assert.equal(e.response.status, 422);
        }
      });
      it('should create new pool', async function() {
        const res = await create_localpool({
          name: 'People Power Testgroup',
          description: 'decentralised power since 2009',
          start_date: "2009/01/01",
          address: generate_address()
        });
        store.store('people_power_testgroup_id', res.id);
      });
      it('should create an owner', async function() {
        let id = store.get('people_power_testgroup_id');
        let org = generate_organization();
        org['name'] = 'Wolfgang Owner GmbH';
        const res = await create_organization_owner(id, org);
        store.store('people_power_testgroup_org_owner_id', res.id);
      });
      it('should assign a gap contract customer owner', async function() {
        let id = store.get('people_power_testgroup_id');
        let owner_id = store.get('people_power_testgroup_org_owner_id');
        const res = await assign_gap_contract_customer(id, owner_id);
      });
    });
  });
});
