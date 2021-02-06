import { Avatar , IconButton ,Button} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import './Post.css'
import firebase from 'firebase';
import {db} from './Firebase';

export const Post = ({user,postId,postImg,caption,userName,}) => {
    const [comments,setComments] = useState([]);
    const [comment,setComment] = useState([]);

    useEffect(()=>{
    let unsubscribe;
    if(postId){
        unsubscribe = db.collection("posts").doc(postId).collection("comments").orderBy("timestamp","desc").
        onSnapshot((snapshot)=>{setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return ()=>{
   unsubscribe();
    };  
 },[postId])

 const postComment = (e)=>{
  e.preventDefault();
  db.collection("posts").doc(postId).collection("comments").add({
      text:comment,
      userName:user.displayName,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
  });
  setComment('');
 }
    return (
        <div className="post">
           <div className="post_top">
               <div className="post_profile">
                 <Avatar/>
               </div>
               <div className="post_info">
                   <h3>{userName}</h3>
                   <p>los,angeles</p>
               </div>
           </div>
           <div className="post_middle">
              <img src={postImg} alt=""/>
           </div>
           <div className="post_bottom">
             <div className="post_option">
                <IconButton>
                    <FavoriteBorderIcon/>
                </IconButton>
                <IconButton>
                    <SendOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <ChatBubbleOutlineOutlinedIcon/>
                </IconButton>
             </div>
             <div className="post_caption">
                 <h4><strong>{userName}</strong>{caption}</h4>
             </div>
             <div className="post_comments">
             <p className="light">View all {comments.length} comments</p>
             {comments.map((comment)=>(
                <h4><strong>{comment.userName}:</strong>{comment.text}</h4>
             ))}
            
             </div>
             {user && (
                  <div className="post_Postcomment"> 
                  <form className="post_commentform">
                     <SentimentSatisfiedOutlinedIcon/>
                     <input 
                      type="text"
                      placeholder=" Write your comment...."
                      value={comment}
                      onChange={(e)=>setComment(e.target.value)}
                      />
                     <Button 
                      type="submit" 
                      color="primary"
                      disabled={!comment}
                      onClick={postComment}
                     >Post</Button>
                  </form>
               </div>
             )}
           </div>
        </div>
        
    )
}
