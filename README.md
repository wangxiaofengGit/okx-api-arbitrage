# okx-api-arbitrage
nodejs crypto quantitative trading template  
alog trading | auto trading | program trading  
币圈量化，基于欧易okx-v5-api的模板，简易框架，内置指标，可以自行编写你的交易策略  
请参考官方文档 refer to https://www.okx.com/docs-v5/en/#overview

## Directory Structure
├── okx-api-arbitrage
│   ├── services
│   │   ├── createOrder.js
│   │   ├── getBalance.js
│   │   ├── getIndicators.js
│   │   └── strategyOrder.js
│   ├── utils
│   │   ├── errorMode.js
│   │   ├── logFile.js
│   │   └── request.js
│   ├── index.js
│   ├── log.txt
│   └── package.json
## Donate

If you find this project useful, you can buy author a glass of juice :tropical_drink:
my ERC20 wallet address <a href="#" class="btn" id="copyButton" data-clipboard-text="asdasdsa">Copy</a>
![donate](https://wangxiaofenggit.github.io/page/address.png)

```javascript
var copyButton = document.getElementById('copyButton');
var clipboard = new ClipboardJS(copyButton);

clipboard.on('success', function(e) {
    alert('copy success：' + e.text);
    e.clearSelection();
});

clipboard.on('error', function(e) {
    alert('copy failed');
});
