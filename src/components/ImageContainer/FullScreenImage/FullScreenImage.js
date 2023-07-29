import React from "react";
import { useState } from "react";
import styles from './fullScreenImage.module.css';

const FullScreenImage = (props) => {
    const {images,initialIndex,onClose,handleImageError} = props;
    const[currentIndex,setCurrentIndex] = useState(initialIndex);
    const [isVisible,setIsVisible] = useState(true);
    const handlePrev = () => {
        setCurrentIndex((prevIndex)=>(prevIndex-1+images.length)%images.length);        
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex)=> (prevIndex+1)%images.length);
    };

    const handleClose = () => {
        setIsVisible(false);
        onClose();
    };

    console.log(images[currentIndex].url);

    if(!isVisible) return null;

    return(
        <>
            <div className={styles.fullScreenContainer}>
                <button className={styles.closeButton} onClick={handleClose}>X</button>

                <div className={styles.imageContainer}>
                    <img src={images[currentIndex].url} alt="" className={styles.fullScreenImage} onError={handleImageError}/>
                </div>

                <button className={styles.leftButton} onClick={handlePrev}>&lt;</button>

                <button className={styles.rightButton} onClick={handleNext}>&gt;</button>
            </div>
        </>
    )
};

export default FullScreenImage;