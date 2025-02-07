
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Task, auth, addTask, getTasks, deleteTask } from "../../firebase.js";

import styles from './User.module.css'
import Navbar from '../../components/Navbar/Navbar.jsx'

export default function User()
{
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDueDate, setTaskDueDate] = useState("");

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
    
        const newTask = {
            userId: user.uid,
            title: taskTitle,
            description: taskDescription,
            dueDate: taskDueDate || null,
            timeCreated: new Date().toJSON().slice(0, 10),
        };
    
        await addTask(newTask);
        setTasks(await getTasks(user.uid));
    
        setTaskTitle("");
        setTaskDescription("");
        setTaskDueDate("");
    };

    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId);
        setTasks(await getTasks(user.uid));
    };

    return(
        <div className={ styles.container } >
            <Navbar />

            <section>
                <div>
                    <input
                        type="text"
                        placeholder="New Title"
                        value={ taskTitle }
                        onChange={ (e) => setTaskTitle(e.target.value) }
                    />

                    <input
                        type="text"
                        placeholder="New Description"
                        value={ taskDescription }
                        onChange={ (e) => setTaskDescription(e.target.value) }
                    />

                    <input
                        type="date"
                        value={ taskDueDate }
                        onChange={ (e) => setTaskDueDate(e.target.value) }
                    />

                    <button onClick={ handleAddTask }>Add Task</button>
                </div>

                <ul>
                    { tasks.map(task => (
                        <li key={ task.id }>
                            <p>Title: { task.title }</p>
                            <p>Description: { task.description }</p>
                            { task.dueDate && <p>Due Date: { task.dueDate }</p>}
                            <p>Time Created: { task.timeCreated }</p>
                            <button onClick={ () => handleDeleteTask(task.id) }>❌</button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}