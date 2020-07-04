import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import CustomizedMenus from './menuBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    margiRight: '60%'
  },
  title: {
    flexGrow: 1,
    color: 'white',
    textDecoration: 'none',
    textAlign: 'end',
    marginRight: theme.spacing(2),
    // background: 'white',
    // color: 'black'
  },
  container: {
    height: '10vh',
  }
}));

const NavBar = inject('user')(observer((props) => {
  const classes = useStyles();
  const loggedIn = props.user.loggedIn

  return (
      <div className={classes.root} id="nav-bar">
        <AppBar position="static" className={classes.container}>
          <Toolbar>

                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <h1 style={{marginLeft:'0'}}>Sunday.com</h1>
                </IconButton>

                <CustomizedMenus loggedIn={loggedIn} className={classes.title}/>

          </Toolbar>
        </AppBar>
      </div>
  );
}))

export default NavBar


