let data_store = {};

module.exports = {
  store: store,
  get: get,
  del: del
};

function store(key, value) {
  data_store[key] = value;
}

function get(key) {
  return data_store[key];
}

function del(key) {
  delete data_store[key];
}
