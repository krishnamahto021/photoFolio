import { Album } from '../Album/Album';
import { AlbumForm } from '../AlbumForm/AlbumForm';
import styles from './albumList.module.css';
import { useState } from 'react';


export const AlbumList = (props) => {
    const [showForm, setShowForm] = useState(false);   
    const {addAlbum,titles,setSelectedAlbum} = props; 
    

    function toggleForm(e) {
        e.preventDefault();
        setShowForm(!showForm);
    }

    function handleAlbumClick(albumid){
        console.log('hey');
        setSelectedAlbum(albumid);
    }
    
    return (
        <>
            <div className={styles.header}>
                <h1>Your Albums</h1>
                {(showForm)?<AlbumForm titles={titles} addAlbum={addAlbum}/>:null}
                <a className={styles.btn} id={showForm?(styles.clearAlbum):(styles.addAlbum)} href='/' onClick={toggleForm}>{showForm?'Cancel':'Add Album'}</a>
            </div>
            <div className={styles.grid}>
            {
                titles.map((single,i)=>{
                    return(
                    <Album title={single.title} key={i} onClick={()=>handleAlbumClick(single.id)}
                    />
                    );
                })
            }
            </div>
        </>
    )

}