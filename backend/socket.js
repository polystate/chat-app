const socketIO = require("socket.io");

module.exports = function (server) {
  const io = socketIO(server, {
    pingTimeout: 60000,
    pingInterval: 5000,
  }); // Create a Socket.io instance attached to your HTTP server

  io.on("connection", () => {
    console.log("we are connected");
  });
};
