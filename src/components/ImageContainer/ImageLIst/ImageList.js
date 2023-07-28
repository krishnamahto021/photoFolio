import { useState } from "react";
import styles from './ImageList.module.css';
import back from '../../../assets/back.png';
import search from '../../../assets/search.png';
import clear from '../../../assets/clear.png';
import { Link } from "react-router-dom";


export const ImageList = (props) => {
    const { showForm, setShowForm} = props;
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

                    <h3>something</h3>
                    <div className={styles.search}>
                        {searchForm ? <input type="text" placeholder="Search...." id={styles.searchInput} required /> : null}
                        {!searchForm ? <img src={search} alt="Search" className={styles.img} onClick={toggleSearch} /> : <img src={clear} alt="clear" className={styles.img} onClick={toggleSearch} />}




                    </div>

                    <button onClick={toggleForm} className={styles.btn} id={showForm ? styles.clearImage : styles.addImage}>{showForm ? 'Cancel' : 'Add Image'}</button>


                </div>

                <div className={styles.imageList}>

                </div>

            </div>


        </>
    )
}