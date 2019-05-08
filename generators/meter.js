const chance = require('chance')();

const generateHardwareId = ({ prefix = 'DE', length }) => () =>
  `${prefix}${Array.from({ length: length - prefix.length }, () =>
    Math.floor(Math.random() * 10),
  ).join('')}`;

const generateMeteringPointId = generateHardwareId({ length: 33 });

const generateMarketLocationId = generateHardwareId({ length: 11 });

function generateGridMeter() {
  let data = generateMeter(true);
  data['registers'] = [
    {
      label: 'GRID_CONSUMPTION',
      name: 'grid',
      market_location_id: generateMarketLocationId()
    },
    {
      label: 'GRID_FEEDING',
      name: 'grid',
      market_location_id: generateMarketLocationId()
    }
  ];
  return data;
}

function generateMeter(one_way) {
  let data = {
    type: 'real',
    datasource: 'standard_profile',
    manufacturer_name: 'other',
    product_serialnumber: chance.string(),
    product_name: 'ExampleMeter',
    direction_number: one_way ? 'ERZ' : 'ZRZ',
    calibrated_until : '2027-10-13',
    converter_constant: 1,
    ownership: 'BUZZN',
    build_year: 2008,
    sent_data_dso: '2009-01-01',
    edifact_metering_type: 'EHZ',
    edifact_meter_size: 'Z01',
    edifact_measurement_method: 'MMR',
    edifact_mounting_method: 'DPA',
    edifact_voltage_level: 'E06',
    edifact_cycle_interval: 'YEARLY',
    edifact_tariff: 'ETZ',
    edifact_data_logging: 'Z05',
    metering_point_id: generateMeteringPointId()
  };
  return data;
}

module.exports = {
  generateMeteringPointId,
  generateMarketLocationId,
  generateMeter,
  generateGridMeter
};
