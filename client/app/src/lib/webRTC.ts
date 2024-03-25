let localStream: MediaStream | null = null;
let peerConnection: RTCPeerConnection | null = null;

async function getMediaStream() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }); // Adjust constraints as needed
    // @ts-ignore
    document.getElementById('localVideo').srcObject = stream; // Assuming you have a local video element to show the stream

    return stream;
  } catch (error) {
    console.error('Error getting user media:', error);
    throw error;
  }
}
async function createPeerConnection(socket: WebSocket) {
  localStream = await getMediaStream();

  peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }], // Example STUN server
  });

  // Add local stream tracks to peer connection
  localStream.getTracks().forEach(track => {
    peerConnection?.addTrack(track, localStream as MediaStream);
  });

  // Listen for remote stream
  peerConnection.ontrack = event => {
    const [remoteStream] = event.streams;
    // @ts-ignore
    document.getElementById('remoteVideo').srcObject = remoteStream; // Assuming you have a remote video element
  };

  // ICE Candidate event handler
  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      // Send candidate to the remote peer
      socket.send(JSON.stringify({ type: 'candidate', payload: event.candidate }));
    }
  };
}

// Caller creates an offer
export async function createOffer(socket: WebSocket) {
  await createPeerConnection(socket);

  const offer = await peerConnection?.createOffer();

  await peerConnection?.setLocalDescription(offer);

  return offer;
}

// Callee receives the offer and creates an answer
export async function onOfferReceived(offer: any, socket: WebSocket) {
  await createPeerConnection(socket);

  await peerConnection?.setRemoteDescription(new RTCSessionDescription(offer));

  const answer = await peerConnection?.createAnswer();

  await peerConnection?.setLocalDescription(answer);

  socket.send(JSON.stringify({ type: 'answer', payload: answer }));
}

// Caller receives the answer
export async function onAnswerReceived(answer: RTCSessionDescriptionInit) {
  await peerConnection?.setRemoteDescription(new RTCSessionDescription(answer));
}

export async function onCandidateReceived(candidate: RTCIceCandidateInit) {
  await peerConnection?.addIceCandidate(new RTCIceCandidate(candidate));
}
