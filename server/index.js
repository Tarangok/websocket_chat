const WebSocket = require('ws');


const wss = new WebSocket.Server({
  port: 1040,
  clientTracking: true,
});
const clients = [];

function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', function connection(ws, req) {
  console.log('connected');
  ws.isAlive = true;
  ws.on('pong', heartbeat);

  console.log(req.url.substr(1));
  clients[req.url.substr(1)] = ws;

  ws.on('message', function incoming(message) {
    console.log(message);
    clients['app'].send(message);
  });
});


setInterval(function ping() {
  wss.clients.forEach(function each(ws) {

    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping('', false, true);
  });
}, 60000);


setInterval(function showClients() {
  console.log(wss.clients.size);
}, 60000);