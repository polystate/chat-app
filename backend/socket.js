const socketIO = require("socket.io");

module.exports = (server) => {
  const io = socketIO(server);

  const allUsers = [];

  io.on("connection", (socket) => {
    io.emit("userCount", io.engine.clientsCount);

    socket.on("userJoined", (userName) => {
      let name;
      let status;

      if (userName === "userName" || !userName) {
        name = `Anon_${socket.id.slice(0, 4)}`;
        status = "Anonymous";
      } else {
        name = userName;
        status = "Logged";
      }

      console.log(`User name has logged in: ${name}`);

      allUsers.push({ name: name, id: socket.id, status: status });
      console.log(`List of all users: `, allUsers);
      io.emit("userJoined", allUsers);
    });

    socket.emit("userJoined");

    socket.on("message", (data) => {
      const userIndex = allUsers.findIndex((user) => user.id === socket.id);

      if (userIndex !== -1 && allUsers[userIndex].name) {
        const currentName = allUsers[userIndex].name;
        data.name = currentName;
        io.emit("message", data);
      } else {
        data.name = "Anon_36w5";
        io.emit("message", data);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User with socket ID ${socket.id} disconnected.`);

      const userIndex = allUsers.findIndex((user) => user.id === socket.id);

      if (userIndex !== -1) {
        allUsers.splice(userIndex, 1);
      }

      io.emit("userCount", io.engine.clientsCount);
      io.emit("lobbyList", allUsers);
    });
  });
};
