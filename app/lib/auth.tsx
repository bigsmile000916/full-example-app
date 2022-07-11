import { User } from '@shared/types/user';
import {
  deleteUser,
  GoogleAuthProvider,
  reauthenticateWithPopup,
  signInWithPopup,
  signOut,
  User as FbUser,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useAuth } from '../context/auth';
import { auth, db } from './firebase/client';

export const login = () => {
  return signInWithPopup(auth, new GoogleAuthProvider());
};

export const logout = () => {
  return signOut(auth);
};

export const deleteAccount = async () => {
  const user = auth.currentUser!;
  return reauthenticateWithPopup(user, new GoogleAuthProvider()).then(() => {
    return deleteUser(user);
  });
};

export const useRequireAuth = () => {
  const { user, fbUser, isLoading } = useAuth();
  const router = useRouter();

  if (!user && !isLoading) {
    console.log(user);
    router.push('/signin');
  }

  return {
    user,
    fbUser,
    isLoading,
  };
};

export const createAccount = (fbUser: FbUser) => {
  const ref = doc(db, `users/${fbUser.uid}`);
  const user: User = {
    id: fbUser.uid,
    name: fbUser.displayName!,
    photoUrl: fbUser.photoURL!,
    coverUrl: '',
    handleName: 'xxx',
    description: '',
    followCount: 0,
    followerCount: 0,
    createdAt: Date.now(),
  };

  return setDoc(ref, user);
};
