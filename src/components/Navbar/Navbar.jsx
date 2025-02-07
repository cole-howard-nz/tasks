import React, { useState, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, login, logout, isAdmin } from "../../firebase.js";

import styles from './Navbar.module.css'
import Logo from '../Logo/Logo.jsx';

export default function Navbar()
{
    const [user, setUser] = useState(null);
    const [MenuOpen, setMenuOpen] = useState(false);
    const [isUserAdmin, setIsUserAdmin] = useState(false);

    useEffect(() => onAuthStateChanged(auth, async (currentUser) => setUser(currentUser)), []);

    useEffect(() => 
    {
        onAuthStateChanged(auth, async (currentUser) => 
        {
            setUser(currentUser);
            if (currentUser) 
            {
                const adminStatus = await isAdmin(currentUser.uid);
                setIsUserAdmin(adminStatus);
            } 
            else
                setIsUserAdmin(false);
        });
    }, []);

    const handleInterfaceOpen = () => 
    {
        const UI = document.getElementById('hiddenInterface');
        const LOGO = document.getElementById('profilePicture');

        UI.style.opacity = 1;
        UI.style.pointerEvents = "all";
        LOGO.style.transform = 'scale(1.05)';
        
        setMenuOpen(true);
    };
 
    const handleInterfaceClose = () => 
    {
        const UI = document.getElementById('hiddenInterface');
        const LOGO = document.getElementById('profilePicture');

        if (UI)
        {
            UI.style.opacity = 0;
            UI.style.pointerEvents = "none";
        }
           
        if (LOGO)
            LOGO.style.transform = 'scale(1)';

        setMenuOpen(false);
    };

    return(
        <header className={ styles.container }>
            <Logo />

            <div className={ styles.userInterface }>

                { user ? (
                    <>
                        <img
                            id="profilePicture"
                            src={user.photoURL} 
                            alt="Profile picture" 
                            className={ styles.profilePicture }
                            onClick={ MenuOpen ? handleInterfaceClose : handleInterfaceOpen }
                        />

                        <div 
                            id="hiddenInterface"
                            className={ styles.hiddenInterface }
                        >
                            { isUserAdmin ? (
                                <div className={ styles.info }>
                                    <p className={ styles.adminTag }>Admin</p>
                                    <p className={ styles.name }>{ user.displayName } </p>
                                </div>
                            ) : (<p>{ user.displayName } </p>) }

                            <div className={ styles.buttons }>
                                <button className={ styles.button }>Export tasks</button>
                                <button className={ styles.button }>Import tasks</button>
                                <button className={ styles.button }>Delete all tasks</button>
                                <button id="logoutButton" className={ styles.logoutButton } onClick={ logout }>Sign out</button>
                            </div>
                        </div>
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