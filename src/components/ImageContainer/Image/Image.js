import styles from './Image.module.css';

export const Image = (props)=>{
    const {title,imageUrl} = props;
    return(
        <>
            <div className={styles.imageContainer}>
            <div className={styles.update}></div>
            <div className={styles.delete}></div>

            <img src={imageUrl} alt={title} className={styles.image} />
            <span className={styles.title}>{title}</span>

            </div>
        </>
    )
}