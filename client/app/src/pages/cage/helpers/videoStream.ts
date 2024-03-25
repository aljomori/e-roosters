export const videoStream = (stream: MediaStream, visualizerRef: HTMLVideoElement | null, socket: WebSocket | null) => {
  let video = visualizerRef;
  if (video && !video.srcObject) {
    video.srcObject = stream;
    video.play();
  }


  if (socket) {
    socket.send('video');
  }
};
