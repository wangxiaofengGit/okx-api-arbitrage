require('./utils/logFile');

// Get asset balance
const getBalance = require('./services/getBalance');
// Open futures order
const createOrder = require('./services/createOrder');
// Create Take Profit and Stop Loss
const strategyOrder = require('./services/strategyOrder');
// get Technical Indicators
const getIndicators = require('./services/strategyOrder');
// get current Indicators
const getPrice = require('./services/getPrice');

async function quantStart() {
    // Example 示例
    console.log('strategy launch');

    const mytBalance = await getBalance();
    if(!mytBalance){
      console.log('failed to obtain account wallet balance');
      // exit the script process
      process.exit();
    }

    const { ma, ema } =  await getIndicators();
    if(ema>ma){
      try{
        // futures order 下单
        await createOrder(1,'buy');
        // the current price
        const currentPrice = await getPrice();
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
