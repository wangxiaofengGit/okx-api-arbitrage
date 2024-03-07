
const request = require('../utils/request');
module.exports =  async function(sz,tpTriggerPx,slTriggerPx){
  /**
     * @param sz btc number (Minimum Unit 0.01)
     * @param slTriggerPx Take Profit
     * @param tpTriggerPx Stop Loss
     * doc refer to https://www.okx.com/docs-v5/en/#overview
  */
  const result =  await request('/api/v5/trade/order-algo','POST',{
    sz,
    instId:"BTC-USDT-SWAP",
    tdMode:"isolated",
    side:"buy",
    ordType:"oco",
    slTriggerPx,
    slOrdPx:-1,
    tpTriggerPx,
    tpOrdPx:-1,
  });

  if(result.code === '0'){
    console.log('Successful order placement',result.data[0].algoId,'Take Profit',tpTriggerPx,'stop loss',slTriggerPx);
  }else{
    errorMode('Strategy order',result);
  }

}