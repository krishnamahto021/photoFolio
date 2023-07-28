import styles from './NavBar.module.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
export const NavBar = () => {
    return (
        <>
            <div className={styles.navBar}>
            <Link to='/'>
            <div className={styles.container}>
                    <div className={styles.imageContainer}>
                        <img src={logo} alt="logo" id={styles.img} />
                        <p id={styles.text}>Photo Folio</p>
                    </div>
                </div>
            </Link>


            </div>
        </>
    )

}