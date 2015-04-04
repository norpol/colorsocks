//Bootstrapping...
if(window.location.host === "")
   var ServerAddress = "localhost:8080";
else
   var serverAddress = window.location.host;
var socket = new WebSocket("ws://" + serverAddress, "echo-protocol");
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

