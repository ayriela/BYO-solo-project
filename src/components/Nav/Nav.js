import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import {List, ListItem, ListItemText, Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles({
  list: {
    width: 250,
    backgroundColor: '#8aacc8',
    height: 1000,
  },
  fullList: {
    width: 'auto',
  },
});


function  Nav (props){
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return(
  <div className="nav">
    <Link to="/home">
      <h1 className="nav-title"> B . Y . O . </h1>
    </Link>
    <div className="nav-right">

      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'Home' : 'Login / Register'}
      </Link>
      
      {/* Show the link to the info page and the logout button if the user is logged in */}
      
        {/* <>
          
          
          <Link className="nav-link" to="/userHome">Go to my Home Page</Link>
          <Link className="nav-link" to="/addFood">Add Food Form</Link>
          <Link className="nav-link" to="/info">
            Info Page
          </Link>
          
        </>
      )} */}
      {/* Always show this link since the about page is not protected */}
      <Link className="nav-link" to="/about">
        About
      </Link>
        
      {props.user.id && (
        <>
        <IconButton
          size="large"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
        //className={clsx(open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="right"
          open={open}
          onClose={handleDrawerClose}
          className="drawer"
        >
          <div
            className={classes.list}
            role="presentation"
            onClick={handleDrawerClose}
            onKeyDown={handleDrawerClose}
          >
            <IconButton onClick={handleDrawerClose}>
              <ChevronRightIcon />
            </IconButton>
            <Divider />
            <List>
              <ListItem button key="editProfile">
                <Link className="nav-link" to="/editProfile">Edit Profile</Link>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem>
                <Link className="nav-link" to="/userHome">See My Event List</Link>
              </ListItem>
              <ListItem button key="createEvent">
                <Link className="nav-link" to="/createEvent">Add an Event</Link>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button key="logOut">
                <LogOutButton className="nav-link"/>
              </ListItem>
            </List>

          </div>
        </Drawer>
        </>)}
      </div>
    
  </div>
)};

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
