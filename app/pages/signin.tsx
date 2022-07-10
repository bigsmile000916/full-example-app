import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../components/button';
import Logo from '../components/logo';
import PageTitle from '../components/page-title';
import SigninSignupForm from '../components/signin-signup-form';
import { useAuth } from '../context/auth';
import { login } from '../lib/auth';

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
