import React,{useState,useEffect} from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './App.css';
import { Post } from './Post';
import Bottombar from './Bottombar';
import {db , auth} from './Firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Widget from './Widget';
import Bottomlo from './Bottomlo';

 
function App() {
  const [open,setOpen] = useState(false);
  const [openlogin,setOpenlogin] = useState(false);
  const [posts , setPosts]= useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);


  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
     if(authUser){
       console.log(authUser);
       setUser(authUser);
      
     }else{
            setUser(null)
     }
   })
  },[user, userName])

  useEffect(()=>{
   db.collection("posts").orderBy("timestamp","desc").onSnapshot(snapshot =>{
    setPosts(snapshot.docs.map(doc => ({
      id:doc.id,
      post:doc.data()})));
   }) 
   
  },[])
 

  const signUp = (e)=>{
  e.preventDefault();
 auth.
 createUserWithEmailAndPassword(email,password)
 .then((authUser) => {
  return authUser.user.updateProfile({
     displayName:userName,
   })
 })
 .catch((error)=> alert(error.message));
 setOpen(false);
  }
  const handleformsubmit= (e)=>{
    e.preventDefault();
    
    }

  const login = (e)=>{
   e.preventDefault();
   auth.signInWithEmailAndPassword(email,password).catch((error) => alert(error.message));
   setOpenlogin(false);
  }  
  

  
  return (
    <div className="app">
      <Dialog
      open={open}
      aria-labelledby="form-dialog-title"
      onClose={()=> setOpen(false)}>
      <DialogTitle id="form-dialog-title"><img className="app_headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="Instagram logo.svg"/></DialogTitle>
        <DialogContent>
          <DialogContentText>
            signUp
          </DialogContentText> 
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="UserName"
            type="text"
            fullWidth
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Paasword"
            type="password"
            fullWidth
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button  type="submit" onClick={signUp} color="primary">
            SIGNUP
          </Button>
        </DialogActions>  
      </Dialog>
      <Dialog
      open={openlogin}
      aria-labelledby="form-dialog-title"
      onClose={()=> setOpenlogin(false)}>
      <DialogTitle id="form-dialog-title"><img className="app_headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="Instagram logo.svg"/></DialogTitle>
        <DialogContent>
          <DialogContentText>
            LOGIN 
          </DialogContentText> 
         
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Paasword"
            type="password"
            fullWidth
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenlogin(false)} color="secondary">
            Cancel
          </Button>
          <Button  type="submit" onClick={login} color="primary">
            LOGIN
          </Button>
        </DialogActions>  
      </Dialog>
      <div className="app_header">

          <img className="app_headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="Instagram logo.svg"/>
          <form className="app_headerInput">
             <SearchIcon/>
             <input  type="text" placeholder /> 
             <button  type="submit" className="form_hid_but" onClick={handleformsubmit}></button>
          </form>
          <div className="app_headerLogin">
            {user ?(
             <Button onClick={()=> auth.signOut()}>
             <AccountCircleIcon/>
             <p>Logout</p>
           </Button>
            ):(
            <> 
              <Button onClick={()=> setOpen(true)}>
                 <AccountCircleIcon/>
                 <p>SignUp</p>
              </Button>
              <Button onClick={()=> setOpenlogin(true)}>
                 <AccountCircleIcon/>
                 <p>Login</p>
              </Button>
            </>
            )} 
          </div>
      </div>
      <div className="app_posts">
        <div className="app_postsleft">
          {
          posts.map(({id,post}) =>(
            <Post key={id} postId={id} user={user} userName={post.userName} postImg={post.postImg} caption={post.caption} />
           ))
          }
        </div>
        <div className="app_postsright">
          <Widget/>
        </div>
      </div>
     
      {user?.displayName?(
       <Bottombar userName={user.displayName} />
      ):(
       <Bottomlo/>
      )}
     
    </div>
  );
}

export default App;
