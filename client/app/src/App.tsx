import { RouterProvider } from 'react-router-dom';
import AuthProvider from '@/src/modules/auth/auth.provider';
import router from '@/src/routing/router';
import SocketProvider from '@/src/modules/sockets/socket.provider';
import './styles/output.css';

const App = () => (
  <AuthProvider>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </AuthProvider>
);

export default App;
