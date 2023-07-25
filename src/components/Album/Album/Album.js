import styles from './album.module.css'
import gallery from '../../../assets/gallery.png';
export const Album = () => {
    return (
        <>
                <div className={styles.album}>
                <img src={gallery} alt="gallery" id={styles.gallery} />
                <span className={styles.title}>Title</span>
                </div>
        </>
    )
}