let dataStore = {};

module.exports = {
  store: (key, value) => {
    dataStore[key] = value;
  },
  get: key => dataStore[key],
  del: key => { delete dataStore[key] },
};
