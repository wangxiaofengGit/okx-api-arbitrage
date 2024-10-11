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
<button onclick="copyToClipboard()">Copy</button>
<script>
  function copyToClipboard() {
    var tempInput = document.createElement("textarea");
    tempInput.value = "0x0FB00e0434f31c4a169990cecF616E7170F2197E";
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("The address has been successfully copied!");
  }
</script>
![donate](https://wangxiaofenggit.github.io/page/address.png)
