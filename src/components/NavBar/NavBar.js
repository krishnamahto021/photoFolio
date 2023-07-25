import styles from './NavBar.module.css';
import  logo from '../../assets/logo.png'
export const NavBar = () => {
    return (
        <>
            <div className={styles.navBar}>
                <div className={styles.container}>
                    <div className={styles.imageContainer}>
                        <img src={logo} alt="logo" id={styles.img}/>
                        <p id={styles.text}>Photo Folio</p>

                    </div>



                </div>

            </div>
        </>
    )

}