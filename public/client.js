//Bootstrapping...
var socket = new WebSocket("ws://localhost:8080", "echo-protocol");
console.log("Foo early");
socket.onerror = function() {
   console.error("Connection Error");
};

socket.onopen = function() {
   console.log((new Date()) + "WebSocket Client Connected");
   socket.send("Häcking UTF-8 ↓");
};

socket.onclose = function() {
   console.log("echo-protocol Client Closed");
};


socket.onmessage = function (event) {
   console.log(event.data);
   var background = document.getElementById("background");
   var wsColor = event.data;
   background.style.backgroundColor = wsColor;
};

