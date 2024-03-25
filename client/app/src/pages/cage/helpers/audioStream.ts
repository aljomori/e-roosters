export const audioStream = (stream: MediaStream, visualizer: HTMLCanvasElement | null, socket: WebSocket | null) => {
  const audioContext = new AudioContext();
  const source = audioContext.createMediaStreamSource(stream);
  const analyzer = audioContext.createAnalyser();
  analyzer.fftSize = 2048; // Set the FFT size
  const bufferLength = analyzer.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  source.connect(analyzer);
  // Visualization function

  if (socket) {
    socket.send(dataArray);
  }

  const visualizeAudio = () => {
    requestAnimationFrame(visualizeAudio); // Call the next frame

    // Get the frequency data from the analyser
    analyzer.getByteFrequencyData(dataArray);
    if (visualizer) {
      drawFrequencyData(visualizer, dataArray);
    }
  };

  if (visualizer) {
    visualizeAudio(); // Start the visualization
  }
};

function drawFrequencyData(canvas: HTMLCanvasElement, dataArray: Uint8Array) {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  const width = canvas.width;
  const height = canvas.height;
  const barWidth = (width / dataArray.length) * 2.5;
  let barHeight;
  let x = 0;

  ctx.clearRect(0, 0, width, height); // Clear previous drawing

  for (let i = 0; i < dataArray.length; i++) {
    barHeight = dataArray[i];

    ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
    ctx.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

    x += barWidth + 1; // Move to the next bar
  }
}
