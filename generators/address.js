const { Chance } = require('chance');
const chance =  Chance();

module.exports = {
  generate_address: generate_address
}

function generate_address() {
  return {
    street: chance.address(),
    zip: chance.zip(),
    city: chance.city(),
    country: chance.country()
  };
}
