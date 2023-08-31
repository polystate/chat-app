const express = require("express");
const app = express();
const PORT = process.env.port || 3000;
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "../public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (userName, message) => {
    console.log(`Received message: ${message} from ${userName}`);

    io.emit("message", userName, message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
