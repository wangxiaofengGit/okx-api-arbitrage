
const request = require('../utils/request');
module.exports =  async function(){

  const result =  await request('/api/v5/asset/asset-valuation','GET',{
    ccy:'USDT'
  });

  if(result.code === '0'){
    return result.data[0].details.trading;
  }else{
    errorMode('getting account balance',result);
  }
  
}