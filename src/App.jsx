import React, { useState, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth, login, logout, addTask, getTasks, deleteTask } from "./firebase.js";

import './App.css';

import User from './pages/User/User.jsx'
import Guest from './pages/Guest/Guest.jsx'

export default function App() 
{
	const [user, setUser] = useState(null);
	
	useEffect(() => 
	{
		onAuthStateChanged(auth, async (currentUser) => setUser(currentUser));
	}, []);

	return (
		<div className="container">
			{ user ? ( 
				<>
					<User />
				</>
			) : (
				<>
					<Guest />
				</>
			)}
		</div>
	);
}