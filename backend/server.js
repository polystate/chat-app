const express = require("express");
const app = express();
const PORT = process.env.port || 3000;
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);

const allUsers = [];

app.use(
  express.static(path.join(__dirname, "../public"), {
    extensions: ["html", "js"],
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript; charset=utf-8");
      }
    },
  })
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

io.on("connection", (socket) => {
  // console.log(`User with socket ID ${socket.id} connected.`);

  io.emit("userCount", io.engine.clientsCount);

  socket.on("userJoined", (userName) => {
    // const existingUser = allUsers.find((user) => user.name === userName);

    // if (existingUser) return;

    allUsers.push({ name: userName, id: socket.id });
    io.emit("userJoined", allUsers);
  });

  socket.broadcast.emit("userJoined");

  socket.on("message", (data) => {
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User with socket ID ${socket.id} disconnected.`);

    const userIndex = allUsers.findIndex((user) => user.id === socket.id);

    if (userIndex !== -1) {
      allUsers.splice(userIndex, 1);
    }

    io.emit("userCount", io.engine.clientsCount);
  });
});

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
