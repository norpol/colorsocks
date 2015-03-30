// nodejs websockets
// for dependencies see also package.json
var WebSocketServer = require('websocket').server;
var http = require('http');
var clientConnections = [];

// Create http server, responses to all requests with given code
var server = http.createServer(function(request, response) {
   console.log((new Date()) + ' Received request for ' + request.url);
   response.writeHead(404);
   response.end();
});

// Launch http server and listen on specified port
server.listen(8080, function() {
   console.log((new Date()) + ' Server is listening on port 8080 ');
});

// Initiate the websocket connection, using the http-server
wsServer = new WebSocketServer({
   httpServer: server,
   autoAcceptConnections: false
});

wsServer.on('request', function(request) {
   var connection = request.accept('echo-protocol', request.origin);
   // Helpers for managing connections
   clientConnections.push(connection);

   // Log inital connection
   console.log((new Date()) + ' Connection accepted by ' + connection.remoteAddress);


   // Send message on inital websocket connection to client
   connection.on('message', function(message) {
      // Possible way of sending broadcast messages, not working by now
      
   clientConnections.forEach(function(client) {
      var color = ["#000", "#F00", "#FF0", "#FFF", "#FF0", "pink", "red", "orange", "blue", "green", "purple", "yellow", "tomato", "darkblue"];
      function sendOverTime() {
         setTimeout(function() {
               connection.sendUTF(color[Math.floor(Math.random() * color.length)]);
               sendOverTime();
            }, 150);
         }
      sendOverTime();
   });
      
      if (message.type === 'utf8') {
         console.log((new Date()) + ' Received Message: ' + message.utf8Data.length + ' bytes');
         connection.sendUTF(message.utf8Data);
      }
   });
   // Log closing connection
   connection.on('close', function(reasonCode, description) {
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
   });
});

