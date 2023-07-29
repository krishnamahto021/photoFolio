import styles from './Image.module.css';
import warning from '../../../assets/warning.png';
import edit from '../../../assets/edit.png';
import trashBin from '../../../assets/trash-bin.png';

export const Image = (props)=>{
    const {title,imageUrl} = props;
    const defaultUrl = warning;
    const handleImageError = (event)=> {
        event.target.src = defaultUrl;
    }

    return(
        <>
            <div className={styles.imageContainer} >
            <div className={styles.update}>
                <img src={edit} alt='edit' className={styles.icon} />
            </div>
            <div className={styles.delete}>
                <img src={trashBin} alt="delete" className={styles.icon} />
            </div>

            <img src={imageUrl} alt={title} className={styles.image} onError={handleImageError}/>
            <span className={styles.title}>{title}</span>

            </div>

        </>
    )
}