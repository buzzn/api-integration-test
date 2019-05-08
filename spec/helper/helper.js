const axios =  require('axios');
let token = null;

module.exports = {
  token: getToken,
  aaxios: aaxios
};

// authorized axios
async function aaxios() {
  return axios.create({
    headers: { 'Authorization': `Bearer ${await getToken()}` }
  });
}

async function getToken() {
  if (!token) {
    token = await loginAndGetToken({url: process.env.URL, login: process.env.LOGIN, password: process.env.PASSWORD});
    if (token === null) {
      throw new Error("unable to login");
    }
  }
  return token;
}

async function loginAndGetToken({url, login, password}) {
  try {
    const res = await axios.post(`${url}/api/me/login`, { login: login, password: password});
    if (res.status == 200) {
      if (res.headers['authorization']) {
        return res.headers['authorization'];
      }
    }
    throw new Error("Something went wrong with the token generation");
  } catch (e) {
    if (e.response && e.response.status == 401) {
      console.log("Credentials are wrong");
    } else {
      console.log("Unable to login");
    }
  }
}
