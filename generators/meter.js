const chance = require('chance')();

const generateHardwareId = ({ prefix = 'DE', length }) => () => `${prefix}${new Array(length - prefix.length).map(chance.natural({ max: 9 }))}`;

const generateMeteringPointId = generateHardwareId({ length: 33 });

const generateMarketLocationId = generateHardwareId({ length: 11 });

const generateMeter = (type) => {
  let data = {};
  return data;
}

module.exports = {
  generateMeteringPointId,
  generateMarketLocationId,
  generateMeter,
};
