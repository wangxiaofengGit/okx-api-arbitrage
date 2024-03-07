require('./utils/logFile');
require('./utils/errorMode');

// Get asset balance
const getBalance = require('./services/getBalance');
// Open futures order
const createOrder = require('./services/createOrder');
// Create Take Profit and Stop Loss
const strategyOrder = require('./services/strategyOrder');
// get Technical Indicators
const getIndicators = require('./services/strategyOrder');

async function quantStart() {
  const { ma, ema, atr, dcPirce, kdj, rsi } =  getIndicators();
  
  // example
    console.log('\nstrategy launch',new Date().toLocaleString());
    const mytBalance = await getBalance();
    if(!mytBalance){
      console.log('failed to obtain account wallet balance, exit abnormally');
      // Exit the script process
      process.exit();
    }
    // futures order
    await createOrder(1,'buy');
    // Order by TP or SL
    await strategyOrder(1,  60000, 50000);
    // do some thing...
}

quantStart();
