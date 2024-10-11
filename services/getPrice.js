const request = require('../utils/request');

module.exports =  async function(){
   /**
   * @param instId currency type
   * doc refer to https://www.okx.com/docs-v5/en/#overview
   */
  const result =  await request('/api/v5/market/ticker','GET',{
    instId:'BTC-USDT-SWAP'  
  });

  if(result.code === '0' ){
    return Number(result.data[0].last);
  }else{
    throw new Error(`get price error: ${JSON.stringify(result)}`);
  }

}