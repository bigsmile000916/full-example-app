import Link from 'next/link';
import { useRouter } from 'next/router';
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

  return (
    <div>
      <h1>Login</h1>
      <button
        onClick={() => {
          login();
        }}
      >
        signin
      </button>
      <Link href="/">
        <a>top</a>
      </Link>
    </div>
  );
};

export default Login;
