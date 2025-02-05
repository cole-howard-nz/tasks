
import styles from './Logo.module.css'

export default function Logo()
{
    return(
        <div className={ styles.container }>
            <div className={ styles.background }>
                <p>t</p>
            </div>

            <p className={ styles.name }>tasks</p>
        </div>
    );
}