const chance = require('chance');
const { generate_address } = require('./address.js');

module.exports = {
  generate_localpool: generate_localpool
};

function generate_localpool(data) {
  {
    name: chance.name();
    address: address;
  }
}
