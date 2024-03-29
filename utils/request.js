const axios = require('axios-https-proxy-fix');
const crypto = require('crypto');

// The parameters such as apikey generated by the exchange, here is the example of okx, other exchanges can refer to the official documentation for modification
const apiKey = '';
const secretkey = '';
const passphrase = '';

// If you need to use a proxy to access the ip and port of the exchange api
// const proxy = {
//   host: '127.0.0.1',
//   port: 61226
// };

// Returns the current IOS time
const getTime = () => {
  return (new Date()).toISOString();
}

// signature operation
const getSign = (str) => {
  return crypto.createHmac('sha256', secretkey).update(str).digest('base64');
}

// generate header information
const getHeaders = (url, method, data = {}) => {
  let timestamp = getTime();
  let sign;
  if (method === 'GET') {
    let arr = []
    Object.keys(data).forEach(item => {
      arr.push(`${item}=${data[item]}`);
    });
    sign = getSign(`${timestamp}${method}${url}${arr.length ? `?${arr.join('&')}` : ''}`);
  } else {
    sign = getSign(`${timestamp}${method}${url}${JSON.stringify(data)}`);
  }
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'OK-ACCESS-KEY': apiKey,
    'OK-ACCESS-SIGN': sign,
    'OK-ACCESS-TIMESTAMP': timestamp,
    'OK-ACCESS-PASSPHRASE': passphrase,
    // This parameter is required for the analog disk
    // "x-simulated-trading": 1,
  }
}

const request = (url, method, data = {}) => {
  let options = {
    method,
    url,
    // proxy,
    baseURL: 'https://www.okx.com',
    headers: getHeaders(url, method, data),
  }

  if (method === 'GET') {
    options.params = data;
  } else {
    options.data = data;
  }

  return axios({
    ...options
  }).then(res => {
    return res.data;
  }).catch((error) => {
    let msg = error.message || error.response.data || error.request;
    return msg;
  });
}

module.exports = request;