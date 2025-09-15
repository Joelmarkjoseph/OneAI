// Use Firebase instances initialized via CDN script in index.html
// Types are relaxed to avoid tight coupling with SDK types when loaded via CDN.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const app = (window as any).firebaseApp;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const auth = (window as any).firebaseAuth;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = (window as any).firebaseDb;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const googleProvider = (window as any).firebaseGoogleProvider;

export { app, auth, googleProvider, db };

