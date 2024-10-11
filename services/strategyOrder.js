
const request = require('../utils/request');
module.exports =  async function(sz,tpTriggerPx,slTriggerPx){
  /**
     * @param sz btc number (Minimum Unit 0.01) 合约单位(1 = 0.01 btc)
     * @param slTriggerPx Take Profit 止盈价
     * @param tpTriggerPx Stop Loss 止损价
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
    throw new Error(`Strategy order error: ${JSON.stringify(result)}`);
  }

}