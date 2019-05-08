const assert = require('assert');
const { generateAddress } = require('../../generators/address.js');
const { generateOrganization } = require('../../generators/person.js');

const { aaxios } = require('../helper/helper.js');
const store = require('../helper/store.js');

async function createLocalpool(data) {
  try {
    const res = await (await aaxios()).post(
      `${process.env.URL}/api/admin/localpools`,
      JSON.stringify(data),
    );
    assert.equal(res.status, 201);
    return res.data;
  } catch (e) {
    throw e;
  }
}

async function createOrganizationOwner({ localpoolId, data }) {
  try {
    const res = await (await aaxios()).post(
      `${
        process.env.URL
      }/api/admin/localpools/${localpoolId}/organization-owner`,
      JSON.stringify(data),
    );
    assert.equal(res.status, 201);
    return res.data;
  } catch (e) {
    throw e;
  }
}

async function assignGapContractCustomer({ localpoolId, customerId }) {
  try {
    const res = await (await aaxios()).post(
      `${
        process.env.URL
      }/api/admin/localpools/${localpoolId}/organization-gap-contract-customer/${customerId}`,
      {},
    );
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
          await createLocalpool({});
          throw 'Should not create';
        } catch (e) {
          assert.equal(e.response.status, 422);
        }
      });
      it('should create new pool', async function() {
        const res = await createLocalpool({
          name: 'People Power Testgroup',
          description: 'decentralised power since 2009',
          start_date: '2009/01/01',
          address: generateAddress(),
        });
        store.store('people_power_testgroup_id', res.id);
      });
      it('should create an owner', async function() {
        const localpoolId = store.get('people_power_testgroup_id');
        const org = generateOrganization();
        org['name'] = 'Wolfgang Owner GmbH';
        const res = await createOrganizationOwner({ localpoolId, data: org });
        store.store('people_power_testgroup_org_owner_id', res.id);
      });
      it('should assign a gap contract customer owner', async function() {
        const localpoolId = store.get('people_power_testgroup_id');
        const customerId = store.get('people_power_testgroup_org_owner_id');
        const res = await assignGapContractCustomer({
          localpoolId,
          customerId,
        });
      });
    });
  });
});
