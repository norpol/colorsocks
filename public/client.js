//Define variables
if(window.location.host === "")
   var serverAddress = "ws://localhost:8080";
else
   var serverAddress = "ws://" + window.location.host;
var socket = new WebSocket(serverAddress, "echo-protocol");

//Handle WebSocket connections
socket.onerror = function() {
   console.error("Connection Error");
};

socket.onopen = function() {
   console.log((new Date()) + " WebSocket Client Connected");
};

socket.onclose = function() {
   console.log("echo-protocol Client Closed");
};

//Receive WebSocket message, set as background-color
socket.onmessage = function (event) {
   var background = document.getElementById("background");
   var wsColor = event.data;
   background.style.backgroundColor = wsColor;
   console.log(new Date(), event.data);
};

//Multibrowser element.requestFullscreen
function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

