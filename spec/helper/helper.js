const axios = require('axios');
let token = null;

// authorized axios
const aaxios = async () =>
  axios.create({
    headers: { Authorization: `Bearer ${await getToken()}` },
  });

const getToken = async () => {
  if (!token) {
    token = await loginAndGetToken({
      url: process.env.URL,
      login: process.env.LOGIN,
      password: process.env.PASSWORD,
    });
    if (!token) {
      throw new Error('unable to login');
    }
  }
  return token;
};

const loginAndGetToken = async ({ url, login, password }) => {
  let newToken = null;
  try {
    const res = await axios.post(`${url}/api/me/login`, {
      login: login,
      password: password,
    });
    if (res.status == 200 && res.headers['authorization']) {
      newToken = res.headers['authorization'];
    } else {
      console.log('Something went wrong with the token generation');
    }
  } catch (e) {
    if (e.response && e.response.status == 401) {
      console.log('Credentials are wrong');
    } else {
      console.log('Unable to login');
    }
  } finally {
    return newToken;
  }
};

module.exports = {
  token: getToken,
  aaxios,
};
