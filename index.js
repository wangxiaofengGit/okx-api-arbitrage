require('./utils/logFile');

const WebSocketClient = require('./utils/webSocket');
// Create WebSocket client instance
const wsClient = new WebSocketClient();

// Open futures order
const createOrder = require('./services/createOrder');
// Create Take Profit and Stop Loss
const strategyOrder = require('./services/strategyOrder');
// get Technical Indicators
const getIndicators = require('./services/strategyOrder');

async function quantStart(){
  console.log('strategy launch');

  let currentPrice;
  // Get real-time tick prices 实时价格
  wsClient.on('receivedMessage', (tickPrice) => {
    currentPrice = tickPrice;
  });

  const { ma,ema } =  await getIndicators();
  if(ema>ma){
    try{
      // futures order 下单
      await createOrder(1,'buy');
      // Order by TP or SL 止盈止损 
      const TPPrice = currentPrice+=currentPrice*0.03;
      const SLPrice = currentPrice-=currentPrice*0.01;
      await strategyOrder(1,  TPPrice, SLPrice);
      // do some thing...
    } catch(error){
      console.log(error.message);
    }
  }
}

quantStart();
