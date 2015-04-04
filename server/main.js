#!/usr/bin/env node;
'use strict';
// nodejs websockets
// for dependencies see also package.json
var WebSocketServer = require('websocket').server;
var http = require('http');
var clientConnections = [];
var colors = ["#000", "#F00", "#FF0", "#FE0FAF", "#FF0", "pink", "red", "orange", "blue", "green", "purple", "yellow", "tomato", "darkblue"];

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
var wsServer = new WebSocketServer({
   httpServer: server,
   autoAcceptConnections: false
});

wsServer.on('request', function(request) {
   var connection = request.accept('echo-protocol', request.origin);
   // Helpers for managing connections
   clientConnections.push(connection);

   // Log inital connection
   console.log((new Date()) + ' Connection accepted by ' + connection.remoteAddress);

   // Send last recent color to freshly connectied client
   connection.sendUTF(colors[0]);

   connection.on('message', function(message) {
      if (message.type === 'utf8') {
         console.log((new Date()) + ' Received Message: ' + message.utf8Data.length + ' bytes');
      }
   });

   // Log closing connection
   connection.on('close', function(reasonCode, description) {
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
   });

});

function sendColorMessage() {
   clientConnections.forEach(
      function(client) {
         client.sendUTF(colors[0]);
      });
}

function shiftTroughColors(){
   colors.push(colors[0]);
   colors.shift();
}

function broadcastColor() {
   setTimeout(function() {
      sendColorMessage();
      shiftTroughColors();
      broadcastColor();
   }, 500);
}

broadcastColor();
