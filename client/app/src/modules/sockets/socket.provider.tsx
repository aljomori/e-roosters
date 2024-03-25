import { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import SocketContext, { ISocketContext, initialSocketContext } from './socket.context';
import { SOCKET_URL } from '@/src/config/environment';

interface ISocketProviderProps {
  children: ReactNode;
}

const SocketProvider: FC<ISocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(initialSocketContext['socket']);

  const connect = useCallback((userId: string, channelId: string) => {
    try {
      const newSocket = new WebSocket(`${SOCKET_URL}/socket?userId=${userId}&channelId=${channelId}`);

      setSocket(newSocket);
    } catch (e) {
      console.log('Error connecting socket', e);
      setSocket(null);
    }
  }, []);

  const memoizedValue = useMemo<ISocketContext>(() => {
    return {
      connect,
      socket,
    };
  }, [connect, socket]);

  return <SocketContext.Provider value={memoizedValue}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
