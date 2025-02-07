
import styles from './Guest.module.css'
import Navbar from '../../components/Navbar/Navbar.jsx'
import NewTask from '../../components/NewTask/NewTask.jsx'

export default function Guest()
{
    return(
        <div className={ styles.container } >
            <Navbar />
            <NewTask />

            <p>Guest Page</p>
        </div>
    );
}