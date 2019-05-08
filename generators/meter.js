const chance = require('chance')();

const generateMeteringPointId = () => `DE${new Array(31).map(chance.integer() % 10)}`;

const generateMarketLocationId = () => `DE${new Array(9).map(chance.integer() % 10)}`;

const generateMeter = (type) => {
  let data = {};
  return data;
}

module.exports = {
  generateMeteringPointId,
  generateMarketLocationId,
  generateMeter,
};
