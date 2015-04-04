//Bootstrapping...
var socket = new WebSocket("ws://192.168.1.173:8080", "echo-protocol");
socket.onerror = function() {
   console.error("Connection Error");
};

socket.onopen = function() {
   console.log((new Date()) + " WebSocket Client Connected");
};

socket.onclose = function() {
   console.log("echo-protocol Client Closed");
};


socket.onmessage = function (event) {
   var background = document.getElementById("background");
   var wsColor = event.data;
   background.style.backgroundColor = wsColor;
   console.log(new Date(), event.data);
};

