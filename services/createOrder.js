const request = require('../utils/request');
module.exports =  async function(sz,side="buy"){
    /**
     * @param sz btc number (Minimum Unit 0.01)
     * @param side future direction (buy or sell)
     * doc refer to https://www.okx.com/docs-v5/en/#overview
     */
    const result =  await request('/api/v5/trade/order','POST',{
    sz,
    side,
    instId:"BTC-USDT-SWAP",
    tdMode:"isolated",
    ordType:"market",
  });

  if(result.code === '0'){
    console.log('The contract order was successfully placed',result.data[0].ordId);
  }else{
    throw new Error(`future order error: ${JSON.stringify(result)}`)
  }

}