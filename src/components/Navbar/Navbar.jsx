import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, login, logout } from "../../firebase.js";

import styles from './Navbar.module.css'
import Logo from '../Logo/Logo.jsx';

export default function Navbar()
{
    const [user, setUser] = useState(null);

    useEffect(() => 
    {
        onAuthStateChanged(auth, async (currentUser) => setUser(currentUser));
    }, []);
    
    return(
        <header className={ styles.container }>
            <Logo />

            <div className={ styles.userInterface }>

                { user ? (
                    <>
                        <h2>Welcome, {user.displayName}!</h2>
                        <img 
                            src={user.photoURL} 
                            alt="Profile" 
                            style={{ width: "100px", borderRadius: "50%" }} 
                        />
                        <button onClick={ logout }>Logout</button>
                    </>
                ) : (
                    <>
                        <button onClick={ login }>Sign in with Google</button>
                    </>
                )}
            </div>

            <button className={ styles.newTask }>new task</button>
        </header>
    );
}