//Bootstrapping...
var socket = new WebSocket("ws://localhost:8080", "echo-protocol");

socket.onerror = function() {
   console.error("Connection Error");
};

socket.onopen = function() {
   console.log((new Date()) + "WebSocket Client Connected");

   function sendNumber() {
      if (socket.readyState === socket.OPEN) {
         var number = Math.round(Math.random() * 0xFFFFFF);
         socket.send(number.toString());
         setTimeout(sendNumber, 1000);
      }
   }
   sendNumber();
};

socket.onclose = function() {
   console.log("echo-protocol Client Closed");
};

socket.onmessage = function(e) {
   if (typeof e.data === "string") {
      console.log("Received: '" + e.data + "'");
   }
};

