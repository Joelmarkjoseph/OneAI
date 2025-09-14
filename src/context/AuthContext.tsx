import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db, googleProvider } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  setPersistence,
  browserLocalPersistence,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const ensureUserDocs = async (firebaseUser: User) => {
    const { uid, displayName, email, photoURL } = firebaseUser;
    // Base user profile doc
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        displayName: displayName || null,
        email: email || null,
        photoURL: photoURL || null,
        createdAt: serverTimestamp(),
      });
    }

    // Progress doc with initial zeroes
    const progressRef = doc(db, "users", uid, "meta", "progress");
    const progressSnap = await getDoc(progressRef);
    if (!progressSnap.exists()) {
      await setDoc(progressRef, {
        overall: 0,
        weeklyGoal: 0,
        monthlyTarget: 0,
        streak: 0,
        totalHours: 0,
        certificates: 0,
        skills: [],
        createdAt: serverTimestamp(),
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setLoading(true);
      setUser(firebaseUser);
      if (firebaseUser) {
        ensureUserDocs(firebaseUser).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value: AuthContextValue = useMemo(
    () => ({ user, loading, signInWithGoogle, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

