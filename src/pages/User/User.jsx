
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, addTask, getTasks, deleteTask } from "../../firebase.js";

import styles from './User.module.css'
import Navbar from '../../components/Navbar/Navbar.jsx'

export default function User()
{
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        if (currentUser) 
        {
            const userTasks = await getTasks(currentUser.uid);
            setTasks(userTasks);
        }
        });
    }, []);

    const handleAddTask = async () => {
        if (!taskTitle.trim()) return;
        await addTask(user.uid, taskTitle);
        setTasks(await getTasks(user.uid));
        setTaskTitle("");
    };

    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId);
        setTasks(await getTasks(user.uid));
    };

    return(
        <div className={ styles.container } >
            <Navbar />
            
            <p>User Page</p>

            <div>
                <input
                    type="text"
                    placeholder="New Task"
                    value={ taskTitle }
                    onChange={ (e) => setTaskTitle(e.target.value) }
                />
                <button onClick={ handleAddTask }>Add Task</button>
            </div>

            <ul>
                { tasks.map(task => (
                    <li key={ task.id }>
                        { task.title } <button onClick={ () => handleDeleteTask(task.id) }>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}