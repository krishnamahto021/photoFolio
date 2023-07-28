import styles from './album.module.css'
import gallery from '../../../assets/gallery.png';
import { Link } from 'react-router-dom';
export const Album = (props) => {
    const { title } = props;
    return (
        <>
            <Link to='/image-list' id={styles.link}>
                <div className={styles.album}>
                    <img src={gallery} alt="gallery" id={styles.gallery} />
                    <span className={styles.title}>{title}</span>
                </div>
            </Link>
        </>
    )
}