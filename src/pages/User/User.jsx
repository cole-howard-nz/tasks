
import styles from './User.module.css'
import Navbar from '../../components/Navbar/Navbar.jsx'

export default function User()
{
    return(
        <div className={ styles.container } >
            <Navbar />

            <p>User Page</p>
        </div>
    );
}