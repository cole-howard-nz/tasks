import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
export { auth, login, logout, addTask, getTasks, deleteTask, getAdmins, isAdmin };

const firebaseConfig = 
{
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const auth = getAuth(app);



const login = () => signInWithPopup(auth, provider);

const logout = () => signOut(auth);

const addTask = async (userId, title) => 
{
  await addDoc(collection(db, "tasks"), { userId, title, completed: false });
};

const deleteTask = async (taskId) => 
{
  await deleteDoc(doc(db, "tasks", taskId));
};

const getTasks = async (userId) => 
{
  const q = query(collection(db, "tasks"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const getAdmins = async () =>
{
  const q = query(collection(db, "admins"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const isAdmin = async (userId) => 
{
  const q = query(collection(db, "admins"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  console.log("User ID:", userId);  // Debugging: Log the userId
  console.log("Docs found:", querySnapshot.docs.map(doc => doc.data())); // Log the actual data
  
  return querySnapshot.docs.length > 0; // Returns true if at least one matching document is found
};