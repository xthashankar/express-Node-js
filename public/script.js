// //front end program here
// const { Socket } = require("socket.io");
//showing the own video in page by js
const socket = io("/");
const videoshow = document.getElementById("video-grid");
let myVideoStream;
const myVideo = document.createElement("video");
myVideo.muted = true;
const peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "3030",
});
navigator.mediaDevices
  .getUserMedia({
    video: true, //it access the media like video and audio when it is true
    audio: true, //when it is false we cannot access the audio or video
  })
  .then((stream) => {
    myvideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on("call", (call) => {
      call.answer(stream); // Answer the call with an A/V stream.
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        // Show stream in some video
        addVideoStream(video, userVideoStream);
      });
    });
    socket.on("user-connected", (userId) => {
      connecToNewUser(userId, stream);
    });
  });
peer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

const connecToNewUser = (userId, stream) => {
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    // Show stream in some video/canvas element.
    addVideoStream(video, userVideoStream);
  });
};

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoshow.append(video);
};
