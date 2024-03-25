import { useContext } from 'react';
import SocketContext from "@/src/modules/sockets/socket.context";

const useSocket = () => {
  return useContext(SocketContext);
};

export default useSocket;
