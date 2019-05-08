const { Chance } = require('chance');
const chance =  Chance();

function generate_metering_point_id() {
  return 'DE' + new Array(31).map(chance.integer() % 10);
}

function generate_market_location_id() {
  return 'DE' + new Array(9).map(chance.integer() % 10);
}

function generate_meter(type) {
  let data = {
  };
  return data;
}
