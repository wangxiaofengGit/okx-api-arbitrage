const WebSocket = require('ws');
const EventEmitter = require('events');

// Create an event emitter instance
class WebSocketClient extends EventEmitter {
  constructor() {
    super();
    this.ws = null;
    this.reconnectInterval = 1000; 
    this.maxReconnectInterval = 30000;
    this.maxRetries = 10; // Maximum number of reconnections 最大重连次数
    this.retryCount = 0;
    this.connect();
  }

  connect() {
    const OKX_WS_URL = "wss://ws.okx.com:8443/ws/v5/public";
    this.ws = new WebSocket(OKX_WS_URL);

    this.ws.on('open', () => {
      console.log('Connected to OKX WebSocket');
      this.retryCount = 0;
      const subscriptionMessage = {
        op: "subscribe",
        args: [
          {
            channel: "tickers",
            instId: "BTC-USDT-SWAP"
          }
        ]
      };
      this.ws.send(JSON.stringify(subscriptionMessage));
    });

    this.ws.on('message', (data) => {
      const message = JSON.parse(data);
      // Launch a custom event and pass the received message out 推送实时价格
      this.emit('receivedMessage', message.data&&message.data[0].last);
    });

    this.ws.on('close', (code, reason) => {
      console.log(`WebSocket connection closed: ${code} - ${reason}`);
      this.handleReconnect();
    });

    this.ws.on('error', (err) => {
      console.error('WebSocket error:', err.message);
      this.handleReconnect();
    });
  }

  // Handling reconnection 处理重连逻辑
  handleReconnect() {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      // exponential backoff
      this.reconnectInterval = Math.min(this.reconnectInterval * 2, this.maxReconnectInterval);
      console.log(`Reconnecting in ${this.reconnectInterval / 1000} seconds...`);
      setTimeout(() => this.connect(), this.reconnectInterval);
    } else {
      console.error("Max retries reached. Failed to reconnect.");
    }
  }
}

module.exports = WebSocketClient;
