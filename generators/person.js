const chance = require('chance')();
const { generateAddress } = require('./address.js');

const generatePerson = () => ({
  first_name: chance.first(),
  last_name: chance.last(),
  prefix: chance.integer() % 2 ? 'M' : 'F',
  email: chance.email(),
  preferred_language: 'en',
  phone: chance.phone(),
  address: generateAddress(),
});

const generateOrganization = () => ({
  name: chance.name(),
  address: generateAddress(),
  email: chance.email(),
  fax: chance.phone(),
  phone: chance.phone(),
  contact: generatePerson(),
  legal_representation: generatePerson(),
});

module.exports = {
  generateOrganization,
  generatePerson,
};
