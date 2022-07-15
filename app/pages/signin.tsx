import { useRouter } from 'next/router';
import SigninSignupForm from '../components/signin-signup-form';
import { useAuth } from '../context/auth';

const Login = () => {
  const router = useRouter();
  const { user, fbUser, isLoading } = useAuth();

  if (user) {
    router.push('/');
  }

  if (!isLoading && fbUser && !user) {
    router.push('/signup');
  }

  return <SigninSignupForm mode="signin" />;
};

export default Login;
