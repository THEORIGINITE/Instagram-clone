import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import Toolbar from '@material-ui/core/Toolbar';
import './Bottombar.css';

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
const Bottomlo = () => {
    const classes = useStyles();
    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
           <div className="bottomlodiv">
           <img className="app_headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="Instagram logo.svg"/>
               <p>LOGIN TO POST</p>
           </div>
        </Toolbar>
      </AppBar>
    )
}

export default Bottomlo
