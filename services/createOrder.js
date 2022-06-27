const request = require('../utils/request');
module.exports =  async function(sz){
    const result =  await request('/api/v5/trade/order','POST',{
    sz,
    instId:"BTC-USDT-SWAP",
    tdMode:"isolated",
    clOrdId:"contract",
    side:"sell",
    ordType:"market",
  });

  if(result.code === '0'){
    console.log('The contract order was successfully placed',result.data[0].ordId);
  }else{
    errorMode('Contract order ',result);
  }

}