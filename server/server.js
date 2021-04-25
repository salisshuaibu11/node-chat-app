const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 300;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.emit("newMessage", {
    from: "john",
    text: "See you then",
    createdAt: 123123,
  });

  socket.emit("newEmail", {
    from: "salis@gmail.com",
    text: "Hey, what is going on",
    createdAt: 123,
  });

  socket.on("createMessage", (message) => {
    console.log("createMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected ");
  });
});

server.listen(3000, () => {
  console.log(`Serve running on port ${port}`);
});
