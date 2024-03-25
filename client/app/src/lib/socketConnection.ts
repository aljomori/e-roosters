import { SOCKET_URL } from '@/src/config/environment';

class SocketConnection {
  socket: WebSocket | null = null;

  constructor(token: string, channelId: string) {
    this.socket = new WebSocket(`${SOCKET_URL}/socket?token=${token}&channelId=${channelId}`);

    return this;
  }
}

export default SocketConnection;
