import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import { requireAuth, requireNotAuth } from '@/src/modules/auth/helpers';
import routes from '@/src/routing/routes';
import Cage from '@/src/pages/cage/Cage';
import SignIn from '@/src/pages/signIn/SignIn';
import Lobby from '@/src/pages/lobby/Lobby';
import Matchmaking from '@/src/pages/matchmaking/Matchmaking';

const browserRouter: RouteObject[] = [
  {
    path: routes.root.path,
    element: <Navigate to={routes.signIn.absolute} />,
  },
  {
    path: routes.lobby.path,
    loader: requireAuth,
    element: <Lobby />,
  },
  {
    path: routes.signIn.path,
    loader: requireNotAuth,
    element: <SignIn />,
  },
  {
    path: routes.cage.path,
    loader: requireAuth,
    element: <Cage />,
  },
  {
    path: routes.matchmaking.path,
    loader: requireAuth,
    element: <Matchmaking />,
  },
];

const router = createBrowserRouter(browserRouter);
export default router;
