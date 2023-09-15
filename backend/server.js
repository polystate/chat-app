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
  console.log(io.engine.clientsCount);

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

  socket.broadcast.emit("userJoined");

  socket.on("message", (data) => {
    const userIndex = allUsers.findIndex((user) => user.id === socket.id);
    const currentName = allUsers[userIndex].name;
    data.name = currentName;
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    // console.log(`User with socket ID ${socket.id} disconnected.`);

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
