import { User } from '@shared/types/user';
import { onAuthStateChanged, User as FbUser } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, db } from '../lib/firebase/client';

type Values = {
  user: User | null;
  fbUser?: FbUser | null;
  isLoading?: boolean;
};

const AuthContext = createContext<Partial<Values>>({});

export const AuthProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [fbUser, setFbUser] = useState<FbUser | null>();
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    return onAuthStateChanged(auth, (fbUser) => setFbUser(fbUser));
  }, []);

  useEffect(() => {
    if (fbUser) {
      const ref = doc(db, `users/${fbUser.uid}`);
      return onSnapshot(ref, (snap) => {
        setUser((snap.data() as User) || null);
      });
    } else if (fbUser === null) {
      setUser(null);
    }
  }, [fbUser]);

  return (
    <AuthContext.Provider
      value={{ fbUser, isLoading: user === undefined, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
