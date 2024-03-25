import { useCallback, useMemo } from 'react';

let socket: WebSocket | null = null;

const useSockets2 = () => {
  const handleMessages = useCallback((event: MessageEvent<string>) => {
    // event.data
    console.log('the-group-chat', event);
  }, []);

  const startConnection = useCallback((userId: string, roomId: string) => {
    console.log('socket', socket);
    if (socket !== null) {
      return;
    }

    socket = new WebSocket(`ws://localhost:3000/socket?userId=${userId}&roomId=${roomId}`);

    // message is received
    socket.addEventListener('message', event => {
      console.log('message', event);
    });

    // socket opened
    socket.addEventListener('open', event => {
      console.log('open', event);
    });

    // socket closed
    socket.addEventListener('close', event => {
      console.log('close', event);
    });
  }, []);

  const send = useCallback(
    (data: string | ArrayBufferView | ArrayBufferLike | Blob) => {
      if (!socket) {
        return;
      }
      console.log('socket send');
      socket.send(data);
    },
    [socket],
  );

  const endConnection = useCallback(() => {
    console.log('endConnections');
    if (!socket) {
      return;
    }
    socket.removeEventListener('message', handleMessages);
    socket.close();
  }, []);

  return useMemo(() => ({ send, startConnection, endConnection }), [send, startConnection, endConnection]);
};

export default useSockets2;
