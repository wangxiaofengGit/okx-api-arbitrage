require('./utils/logFile');
require('./utils/errorMode');

// Get asset balance
const getBalance = require('./services/getBalance');
// Open contract order
const createOrder = require('./services/createOrder');
// Create Take Profit and Stop Loss
const strategyOrder = require('./services/strategyOrder');

async function quantStart() {
  // example
    console.log('\nstrategy launch',new Date().toLocaleString())
    const mytBalance = await getBalance();
    if(!mytBalance){
      console.log('Failed to obtain account wallet balance, exit abnormally');
      // Exit the script process
      process.exit();
    }
    // contract order
    await createOrder(1);
    // Order by Strategy
    await strategyOrder(1,  10000, 15000);
    // do some thing...
}

quantStart();
