
import styles from './Guest.module.css'
import Navbar from '../../components/Navbar/Navbar.jsx'

export default function Guest()
{
    return(
        <div className={ styles.container } >
            <Navbar />
            
            <p>Guest Page</p>
        </div>
    );
}