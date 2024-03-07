const request = require('../utils/request');

/**
   * @param description Technical Indicators
*/

// moving average (MA)
function getAveragetPrice(data) {
  let sum = data.reduce((prev,current) => {
    return prev+Number(current[4]);
  },0)
  return sum/data.length;
}

// exponential moving average (EMA)
function getEmaPrice(data){
    let arr = data.reverse();
    let emaList = [];
    for(let i =0;i<arr.length;i++){
        let x = arr[i][4];
        let y = emaList.length>0?emaList[emaList.length-1]:x;
        let n =i+1;
        let ema =(2*x+(n-1)*y)/(n+1); 
        emaList.push(ema);
    }
    let emaPrice = emaList[emaList.length-1];
    return emaPrice;
}

// Stochastics (KDJ)
function getkdj(data){
  function getRsv(rsvData){
    let maxPrice = rsvData.reduce((prev,current) => {
      if(current[2]>prev){
        return current[2];
      }
      return prev
    },rsvData[0][2]);
    let minPrice = rsvData.reduce((prev,current) => {
      if(current[3]<prev){
        return current[3];
      }
      return prev
    },rsvData[0][3]);
    let rsv = ((rsvData[0][4]- minPrice)/(maxPrice - minPrice))*100;
    return rsv;
  }
  let k=50
  let d=50;
  for(let i=0;i<9;i++){
    k = (2/3)*k+(1/3)*getRsv(data.slice(8-i,17-i));
    d = (2/3)*d+(1/3)*k;
  }
  let kdjAverage = (k+d)/2;
  return kdjAverage;
}

// Relative Strength Index (RSI)
function getRsi(data){
  function calcRsi(rsiData){
    let up=0;
    let dn=0;
    rsiData.forEach((item,index) => {
      if(index<rsiData.length-1){
        let dif = item[4]-rsiData[index+1][4];
        if(dif>0){
          up+=dif;
        }else{
          dn+=Math.abs(dif);
        }
      }
    });
    return (up/(dn+up))*100;
  }
  let rsi1 = calcRsi(data.slice(0,7));
  let rsi2 = calcRsi(data);
  let rsiAverage = (rsi1+rsi2)/2;
  return rsiAverage;
}

// average True Range (ATR)
function getAtrPirce(data){
  return data.reduce((prev,current,index) => {
    if(index===14){
      return prev;
    }
    let price1 = current[2] - current[3];
    let price2 = Math.abs(current[2] - data[index+1][4]);
    let price3 = Math.abs(current[3] - data[index+1][4]);
    return prev+Math.max(price1,price2,price3)
  },0)/14
}

// Dochian Channel (DC)
function getDcPirce(data){
  data[0][2] = data[0][2]*0.9999;
  data[0][3] = data[0][3]*1.0001;
  let max = data.reduce((prev,current) => {
    if(current[2]>prev){
      return current[2];
    }
    return prev
  },data[0][2]);
  let min = data.reduce((prev,current) => {
    if(current[3]<prev){
      return current[3];
    }
    return prev
  },data[0][3]);
  return { max, min };
}
  
module.exports =  async function(){
   /**
     * @param limit number of kline data 
     * doc refer to https://www.okx.com/docs-v5/en/#overview
    */
  const result =  await request('/api/v5/market/candles','GET',{
    instId:'BTC-USDT-SWAP',
    bar:'1H',
    limit:20,
  });

  if(result.code === '0'){
    return{
      ma: getAveragetPrice(result.data),
      ema: getEmaPrice(result.data),
      dcPirce: getDcPirce(result.data),
      atr: getAtrPirce(result.data.slice(0,15)),
      kdj: getkdj(result.data.slice(0,18)),
      rsi: getRsi(result.data.slice(0,13)),
    }
  }else{
    errorMode('get kline data',result);
  }
  
}