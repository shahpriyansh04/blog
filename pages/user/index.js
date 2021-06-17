import { useAuth } from '../../utils/auth';
import Router from 'next/router';
import { Button } from '@chakra-ui/react';

const User = () => {
  const auth = useAuth();
  if (auth.user == false) {
    Router.push('/user/login');
  }
  return (
    <div>
      <h1>Heelooo</h1>
      <Button
        onClick={(e) => {
          auth.signout();
        }}
      >
        LOGOUT
      </Button>
    </div>
  );
};
export default User;
