import { Button } from "@material-ui/core";
import React, { useState } from 'react';
import { storage, db } from "./firebase";
import firebase from "./firebase";


function ImageUpload({username}) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  
  const handleChange = (e) => {
    if (e.target.files[0]) {
        setImage(e.target.files[0]);
    }
  };

  const handelUpload = () => {
    const uplaodTask = storage.ref(`images/${image.name}`).put(image);

    uplaodTask.on (
        "state_changed",
        (snapshot) => {
            //progress function...
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
        },
        (error) => {
           //Error function...
            console.log(error);
            alert(error.message);
        },
        () => {
            //complete function...
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                //post image inside of db
                db.collection("posts").add({
                   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                   caption: caption,
                   imageUrl: url,
                   username: username
                });
                
                setProgress(0);
                setCaption("");
                setImage(null);
              });
        }
    );
  };
    
  return (
    <div className="imageUpload"> 
      <progress className="imageUpload__progress" value={progress} max="100" />
      <input type="text" placeholder='Enter a caption...' onChange={event => setCaption(event.target.value)} value={caption} />
      <input type="file" onChange={handleChange} />
      <Button onClick={handelUpload}>
        Upload
      </Button>
    </div>
  )
}
 


export default ImageUpload
