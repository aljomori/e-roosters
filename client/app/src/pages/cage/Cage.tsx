import React, { useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '@/src/modules/auth/useAuth';
import SocketConnection from '@/src/lib/socketConnection';
import { createOffer, onAnswerReceived, onCandidateReceived, onOfferReceived } from '@/src/lib/webRTC';

let socket: WebSocket | null = null;
const Cage = () => {
  const { profile } = useAuth();
  const { cageId } = useParams();
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleSocketOpen = useCallback(async () => {
    const offer = await createOffer(socket as WebSocket);

    if (!socket) {
      console.log('Error no socket', socket);
      return;
    }

    socket?.send(
      JSON.stringify({
        type: 'offer',
        payload: offer,
      }),
    );
  }, []);

  const handleSocketMessages = useCallback((e: MessageEvent) => {
    const parsedMessage = JSON.parse(e.data);

    if (parsedMessage.type === 'offer') {
      onOfferReceived(parsedMessage.payload, socket as WebSocket);

      return;
    }
    if (parsedMessage.type === 'answer') {
      onAnswerReceived(parsedMessage.payload);

      return;
    }
    if (parsedMessage.type === 'candidate') {
      onCandidateReceived(parsedMessage.payload);

      return;
    }
  }, []);

  const handleSocketClose = useCallback(() => {
    console.log('event close');
  }, []);

  useEffect(() => {
    try {
      if (!profile.token || !cageId) {
        return;
      }

      const socketConnection = new SocketConnection(profile.token, cageId);
      socket = socketConnection.socket;

      socket?.addEventListener('open', handleSocketOpen);
      socket?.addEventListener('message', handleSocketMessages);
      socket?.addEventListener('close', handleSocketClose);
    } catch (e) {
      console.log('error connection sockets', e);
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [profile.token, handleSocketMessages, handleSocketOpen, handleSocketClose, cageId]);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <video id="localVideo" autoPlay muted ref={videoRef} style={{ transform: 'scaleX(-1)' }} />
        <video id="remoteVideo" autoPlay muted ref={remoteVideoRef} />
      </div>

      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
};

export default Cage;
