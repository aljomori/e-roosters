import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import routes from '@/src/routing/routes';

const Lobby = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button type="button" onClick={() => navigate(routes.cage.absolute.replace(':cageId', 'room'))}>
        Cage
      </Button>
    </div>
  );
};

export default Lobby;
