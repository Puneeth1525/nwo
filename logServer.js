const WebSocket = require('ws');

function startLoggingServer(port) {
  const wss = new WebSocket.Server({ port });

  wss.on('connection', (ws) => {
    const originalLog = console.log;
    const originalError = console.error;
    console.log("connection established")

    console.log = function() {
      const message = Array.from(arguments).join(' ');
      ws.send(`[LOG] ${message}`);
      originalLog.apply(console, arguments);
    };

    console.error = function() {
      const message = Array.from(arguments).join(' ');
      ws.send(`[ERROR] ${message}`);
      originalError.apply(console, arguments);
    };

    ws.on('close', () => {
      console.log = originalLog;
      console.error = originalError;
    });
  });
}

module.exports = startLoggingServer;
