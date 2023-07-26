import styles from './album.module.css'
import gallery from '../../../assets/gallery.png';
export const Album = (props) => {
    const {title} = props;
    return (
        <>
                <div className={styles.album}>
                <img src={gallery} alt="gallery" id={styles.gallery} />
                <span className={styles.title}>{title}</span>
                </div>
        </>
    )
}