let mediaRecorder: MediaRecorder;
let audioChunks: Blob[] = [];

async function getAudioStream() {
  try {
    return await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    console.error('Error accessing the microphone: ', err);
  }
}
async function startRecording() {
  const audioStream = await getAudioStream();
  if (!audioStream) {
    return;
  }
  mediaRecorder = new MediaRecorder(audioStream);

  mediaRecorder.onstart = () => {
    audioChunks = []; // Clear previous data
  };

  mediaRecorder.ondataavailable = event => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    // You can now use this URL for playback or upload it to a server
    console.log(audioUrl);
  };

  mediaRecorder.start();
}

function stopRecording() {
  if (mediaRecorder) {
    mediaRecorder.stop();
    // onstop event handler will be called after this
  }
}
