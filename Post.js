import React, { useEffect, useState } from 'react'
import './Post.css';
import Avatar from "@material-ui/core/Avatar";
import { db } from './firebase';


function Post({postId, username, caption, imageUrl}) {
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState('');

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {

  }

  return (
    <div className="post">
      <div className="post__header">
       <Avatar
            className="post__avatar"
            alt='jamescarrera66'
            src="/static/images/avatar/1.jpg"
          />
         <h3>{username}</h3>
      </div>
        
     <img className="post__image" src={imageUrl}alt=""/>
     
     
      <h4 className="post__text"><strong>{username}</strong> {caption}</h4>

      <form className="post__commentBox">
      <input 
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            disabled={!comment}
            className="post__button"
            type="submit"
            onClick={postComment}
          >
            Post
          </button>  
        </form>
     </div>
  )
}

export default Post