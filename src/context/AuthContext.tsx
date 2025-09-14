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
import { collection, doc, getDoc, setDoc, serverTimestamp, writeBatch } from "firebase/firestore";

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
    const isFirstSignIn = !userSnap.exists();
    if (isFirstSignIn) {
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
        weeklyTargetHours: 0,
        weeklyCompletedHours: 0,
        createdAt: serverTimestamp(),
      });
    }

    // Seed defaults only on first sign-in
    if (isFirstSignIn) {
      const batch = writeBatch(db);
      const coursesRef = collection(db, "users", uid, "courses");
      const notificationsRef = collection(db, "users", uid, "notifications");

      const defaultCourses = [
        {
          id: "ml-advanced",
          title: "Advanced Machine Learning",
          progress: 0,
          totalLessons: 24,
          completedLessons: 0,
          duration: "8 weeks",
          level: "Advanced",
          rating: 4.9,
          students: 1250,
          thumbnail: "🤖",
          nextLesson: "Introduction",
          category: "AI & ML",
        },
        {
          id: "dsa",
          title: "Data Structures & Algorithms",
          progress: 0,
          totalLessons: 32,
          completedLessons: 0,
          duration: "10 weeks",
          level: "Intermediate",
          rating: 4.8,
          students: 2100,
          thumbnail: "📊",
          nextLesson: "Arrays & Lists",
          category: "Computer Science",
        },
      ];

      defaultCourses.forEach((c) => {
        const ref = doc(coursesRef, c.id);
        batch.set(ref, { ...c });
      });

      const defaultNotifications = [
        {
          id: "welcome",
          type: "system",
          title: "Welcome to OneAi",
          message: "Your dashboard is ready. Start by enrolling in a course!",
          time: "Just now",
          priority: "medium" as const,
          read: false,
          course: null,
          professor: null,
          createdAt: Date.now(),
        },
        {
          id: "ai-professor",
          type: "professor",
          title: "AI Professor Available",
          message: "Ask me anything about your courses or get a study plan.",
          time: "Just now",
          priority: "low" as const,
          read: false,
          course: null,
          professor: "AI Professor",
          createdAt: Date.now() + 1,
        },
      ];

      defaultNotifications.forEach((n) => {
        const ref = doc(notificationsRef, n.id);
        batch.set(ref, { ...n });
      });

      await batch.commit();
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

