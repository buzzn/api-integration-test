const generateHardwareId = ({ prefix = 'DE', length }) => () =>
  `${prefix}${Array.from({ length: length - prefix.length }, () =>
    Math.floor(Math.random() * 10),
  ).join('')}`;

const generateMeteringPointId = generateHardwareId({ length: 33 });

const generateMarketLocationId = generateHardwareId({ length: 11 });

const generateMeter = type => {
  let data = {};
  return data;
};

module.exports = {
  generateMeteringPointId,
  generateMarketLocationId,
  generateMeter,
};
