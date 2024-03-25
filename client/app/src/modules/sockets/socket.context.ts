import { createContext } from 'react';

export interface ISocketContext {
  socket: WebSocket | null;
  connect: (userId: string, channelId: string) => void;
}

export const initialSocketContext: ISocketContext = {
  socket: null,
  connect: (userId: string, channelId: string) => undefined,
};

const SocketContext = createContext<ISocketContext>(initialSocketContext);

export default SocketContext;
