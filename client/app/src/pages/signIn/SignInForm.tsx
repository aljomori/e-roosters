import { HTMLAttributes, SyntheticEvent, useCallback, useState } from 'react';
import { cn } from '@/src/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icons from '@/src/components/Icons';
import useAuth from '@/src/modules/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import routes from '@/src/routing/routes';

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function SignInForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      setIsLoading(true);
      login &&
        login({ username: email, password })
          .then(response => {
            if (response) {
              navigate(routes.lobby.absolute);
            }
          })
          .catch(e => {
            console.log('e', e);
          })
          .finally(() => {
            setIsLoading(false);
          });
    },
    [email, password],
  );

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <Input
              id="password"
              type="password"
              placeholder="Contraseña"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{' '}
        GitHub
      </Button>
    </div>
  );
}
