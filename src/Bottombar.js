import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import Toolbar from '@material-ui/core/Toolbar';
import './Bottombar.css';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import {Button} from '@material-ui/core'
import LinearBuffer from './ProgressBar';
import {db, storage} from './Firebase';
import LinearProgress from '@material-ui/core/LinearProgress';
import firebase from 'firebase';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';



const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor:"white",
    borderTopLeftRadius:"30px",
    borderTopRightRadius:"30px",
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
    backgroundColor:'grey',
  },
}));

export default function Bottombar({userName}) {
  const [image,setImage] = useState(null);
  const [caption,setCaption] = useState("");
  const [progress,setProgress] = useState(0);
  const classes = useStyles();
 
  const handleChange = (e)=>{
    if(e.target.files[0]){
      setImage(e.target.files[0]);
    }else{
      setImage(null)
    }
  }
 const handleUpload= (e)=>{
  e.preventDefault();
  const uploadTask= storage.ref(`images/${image.name}`).put(image);
  uploadTask.on("state_changed",(snapshot)=>{
    const progress = Math.round(
      (snapshot.bytesTransferred/snapshot.totalBytes)*100
    );
    setProgress(progress);
  },(error)=>{
    alert(error.message)
  },()=>{
    storage.ref("images").child(image.name).getDownloadURL().then(url =>{
      db.collection("posts").add({
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        caption:caption,
        postImg:url,
        userName:userName,

      });
      setProgress(0);
      setCaption("");
      setImage(null);
    })
     
  })
 }
 
  return (
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <LinearBuffer progress={progress}/>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
          </IconButton>
        <form className="bottombar_captionform">
            <input className="file_input" onChange={handleChange} type="file" />
            <CreateTwoToneIcon/>
            <input  type="text"  onChange={(e)=> setCaption(e.target.value)} className="caption_input" placeholder="Add a captions to your post..." />
            <Button onClick={handleUpload} color="primary" type="submit">post</Button>
        </form>
          <div className={classes.grow} />
          
        </Toolbar>
      </AppBar>
  );
}
