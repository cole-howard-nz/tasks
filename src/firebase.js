import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, updateDoc, query, where, deleteDoc, doc } from "firebase/firestore";
export { Task, auth, login, logout, addTask, getTasks, editTask, deleteTask, getAdmins, isAdmin };

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



class Task {
  constructor(userId, title, description, dueDate) {
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.timeCreated = new Date().toJSON().slice(0, 10);
    this.dueDate = dueDate;
  }
}

const login = () => signInWithPopup(auth, provider);

const logout = () => signOut(auth);

const addTask = async (task) => 
{
  const newTask = new Task(
    task.userId,
    task.title,
    task.description,
    task.dueDate
  );
  await addDoc(collection(db, "tasks"), { ...newTask });
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

const editTask = async (taskId, newTitle, completedStatus) => 
{
  const taskRef = doc(db, "tasks", taskId);
  try 
  {
    await updateDoc(taskRef, 
    {
      title: newTitle, 
      completed: completedStatus
    });

  } 
  catch (error) {}
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
  return querySnapshot.docs.length > 0;
};