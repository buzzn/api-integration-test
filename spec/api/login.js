const assert = require('assert');
const { token } = require('../helper/helper.js');
const axios =  require('axios');

describe('api', function() {
  describe('login', function() {
    it('should respond with wrong credentials', async function() {
      try {
        const res = await axios.post(`${process.env.URL}/api/me/login`, { login: '', password: ''});
        throw res;
      } catch (e) {
        assert.equal(e.response.status, 401);
      }
    });
    it('should login with proper credentials', async function() {
      const res = await axios.post(`${process.env.URL}/api/me/login`, { login: process.env.LOGIN, password: process.env.PASSWORD});
      assert.equal(res.status, 200);
      assert.ok(res.headers['authorization'] !== null);
      assert.ok(res.headers['authorization'].length > 1);
    });
  });
  describe('helper', function() {
    describe('first attempt', function() {
      it('returns an token', async function() {
        assert.ok((await token()).length > 1);
      });
    });
    describe('second attempt', function() {
      it('returns an token', async function() {
        assert.ok((await token()).length > 1);
      });
    });
  });
});
