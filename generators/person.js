const { Chance } = require('chance');
const { generate_address } = require('./address.js');
const chance =  Chance();

module.exports = {
  generate_organization: generate_organization,
  generate_person: generate_person
};

function generate_person() {
  return {
    first_name: chance.first(),
    last_name: chance.last(),
    prefix: (chance.integer() % 2) ? 'M' : 'F',
    email: chance.email(),
    preferred_language: 'en',
    phone: chance.phone(),
    address: generate_address()
  };
}

function generate_organization() {
  return {
    name: chance.name(),
    address: generate_address(),
    email: chance.email(),
    fax: chance.phone(),
    phone: chance.phone(),
    contact: generate_person(),
    legal_representation: generate_person()
  };
}
