# okx-api-arbitrage
nodejs crypto quantitative trading template  
alog trading | auto trading | program trading  
币圈量化，基于欧易okx-v5-api的模板，简易框架，内置指标，可以自行编写你的交易策略  
请参考官方文档 refer to https://www.okx.com/docs-v5/en/#overview

## Directory Structure
```
    ├── okx-api-arbitrage
    │   ├── services      
    │   │   ├── createOrder.js        -- create btc future order
    │   │   ├── getBalance.js         -- get trading account available balance
    │   │   ├── getIndicators.js      -- some common indicators
    │   │   └── strategyOrder.js      -- Set profit and loss stop measures
    │   ├── utils                   
    │   │   ├── logFile.js            -- for write logs
    │   │   └── request.js            -- http request
    │   ├── logs                      -- log 
    │   ├── index.js                  -- startup
    │   └── package.json
```
## Startup
npm run start

## Donate
If you find this project useful, you can buy author a cup of coffee :coffee:  
my ERC20 wallet address  
![donate](https://wangxiaofenggit.github.io/page/address.png)
