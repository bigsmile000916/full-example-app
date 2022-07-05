import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/auth';
import { createAccount } from '../lib/auth';

const Signup = () => {
  const { fbUser, user } = useAuth();
  const router = useRouter();

  if (!fbUser) {
    return null;
  }

  if (user) {
    router.push('/');
  }

  return (
    <div>
      <form>
        <h2>avatar</h2>
        <input type="file" />
        <span>name</span>
        <input type="name" required />
        <textarea required />
        <button
          type="button"
          onClick={() => {
            createAccount(fbUser).then(() => router.push('/'));
          }}
        >
          signup
        </button>
      </form>
      <Link href="/">
        <a>top</a>
      </Link>
    </div>
  );
};

export default Signup;
