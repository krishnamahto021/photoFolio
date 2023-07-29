import styles from './Image.module.css';
import warning from '../../../assets/warning.png';
import edit from '../../../assets/edit.png';
import trashBin from '../../../assets/trash-bin.png';
import { useState } from 'react';
import FullScreenImage from '../FullScreenImage/FullScreenImage';

export const Image = (props)=>{
    const {title,imageUrl,imagesArray,index} = props;
    const defaultUrl = warning;
    const [isFullScreenOpen,setFullScreenOpen] = useState(false);
    const [clickedImageIndex,setClickedImageIndex] = useState(null);

    const handleImageError = (event)=> {
        event.target.src = defaultUrl;
    }

    const handleImageClick = ()=>{
        setClickedImageIndex(index);
        setFullScreenOpen(true);
    }

    const handlCloseFullScreen = () =>{
        setFullScreenOpen(false);
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

            <img src={imageUrl} alt={title} className={styles.image} onError={handleImageError} onClick={handleImageClick}/>
            <span className={styles.title}>{title}</span>

            </div>

            {isFullScreenOpen?<FullScreenImage images={imagesArray} initialIndex={clickedImageIndex} onClose={handlCloseFullScreen} handleImageError={handleImageError}  />: null}

        </>
    )
}