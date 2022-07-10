import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Button from '../components/button';
import Layout from '../components/layout';
import { useAuth } from '../context/auth';
import { createAccount, login } from '../lib/auth';
import { NextPageWithLayout } from './_app';

const Signup: NextPageWithLayout = () => {
  const { fbUser } = useAuth();
  const router = useRouter();

  if (!fbUser) {
    router.push('/');
    return null;
  }

  if (!fbUser) {
    return (
      <div className="container my-10">
        <Button onClick={login}>Login</Button>
      </div>
    );
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

Signup.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Signup;
