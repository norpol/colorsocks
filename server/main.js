// nodejs websockets
// for dependencies see also package.json
var WebSocketServer = require('websocket').server;

var clients = [];
var server = "127.0.0.1:8000";
var socket = new WebSocketServer({
   httpServer: server,
   autoAcceptConnections: false
});

socket.on('request', function(request) {
   var connection = request.accept('any-protocol', request.origin);
   clients.push(connection);
   connection.on('message', function(message) {
      //broadcast the message to all the clients
      clients.forEach(function(clients) {
         clients.send(message.utf8Data);
      });
   });
});
