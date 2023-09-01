import outputMessage from "../script";

//Modularize

const socketModule = (function () {
  //Initialize socket.io
  const socket = io();

  //turn socket.on to listen for 'message' event emitted from server
  socket.on("message", (data) => {
    const { name, message } = data;
    outputMessage(name, message);
  });

  // ** inside event listener partial **//
  socket.emit("message", { name: userName, message: userInput.value });

  //turn socket.on to listen for 'message' event emitted from server

  socket.on("message", (data) => {
    const { name, message } = data;
    outputMessage(name, message);
  });
})();
