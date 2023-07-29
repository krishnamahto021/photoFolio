import { useState } from "react";
import styles from './ImageList.module.css';
import back from '../../../assets/back.png';
import search from '../../../assets/search.png';
import clear from '../../../assets/clear.png';
import { Link } from "react-router-dom";
import { Image } from "../Image/Image";


export const ImageList = (props) => {
    const { showForm, setShowForm, images ,loading,title,deleteImage} = props;
    const [searchForm, setSearchForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    }

    const toggleSearch = () => {
        setSearchForm(!searchForm);
    }


    return (
        <>


            <div className={styles.container}>
                <div className={styles.top}>
                    <Link to='/'><span className={styles.back}>
                        <img src={back} alt="back" className={styles.img} />
                    </span></Link>

                    <h3 className={styles.text}>{images.length === 0 ? 'No images found in the album':`Images in ${title}`}</h3>
                    <div className={styles.search}>
                        {searchForm ? <input type="text" placeholder="Search...." id={styles.searchInput} required /> : null}
                        {!searchForm ? <img src={search} alt="Search" className={styles.img} onClick={toggleSearch} /> : <img src={clear} alt="clear" className={styles.img} onClick={toggleSearch} />}
                    </div>

                    <button onClick={toggleForm} className={styles.btn} id={showForm ? styles.clearImage : styles.addImage}>{showForm ? 'Cancel' : 'Add Image'}</button>


                </div>

                <div className={styles.imageList}>
                    {/* Conditionally render content based on loading state */}
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        images.map((image,i) => (
                            <Image key={image.id} title={image.title} imageUrl={image.url} imagesArray={images} index={i} deleteImage={()=>deleteImage(image.id)} />
                        ))
                    )}
                </div>
                

            </div>


        </>
    )
}