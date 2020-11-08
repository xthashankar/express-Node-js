const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
app.use("/peerjs", peerServer);
app.set("view engine", "ejs");
app.use(express.static("public"));

// app.get('/', (req, res) => {
//   res.render('hello world');
// })

// server.listen(3030);
app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`); //it will generate the uuid
});
//create a room id
app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});
io.on("connection", (socket) => {
  //user joining the room
  socket.on("join-room", (roomId, userId) => {
    // console.log("joined room");
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
  });
});

server.listen(3030);
