
const request = require('../utils/request');
module.exports =  async function(){
  /**
   * @param ccy currency type
   * doc refer to https://www.okx.com/docs-v5/en/#overview
   */
  const result =  await request('/api/v5/asset/asset-valuation','GET',{
    ccy:'USDT'
  });

  if(result.code === '0'){
    return result.data[0].details.trading;
  }else{
    throw new Error(`getting account balance error: ${JSON.stringify(result)}`)
  }
  
}