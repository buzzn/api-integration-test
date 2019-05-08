const chance = require('chance')();

const generateAddress = () => ({
  street: chance.address(),
  zip: chance.zip(),
  city: chance.city(),
  country: chance.country(),
});

module.exports = {
  generateAddress,
};
