const express = require("express");
const app = express();
const PORT = process.env.port || 3000;
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const socketSetup = require("./socket");

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

socketSetup(server);

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
