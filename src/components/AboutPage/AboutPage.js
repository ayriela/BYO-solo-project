import React from 'react';

import {Paper} from '@material-ui/core';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

import './AboutPage.css';

const AboutPage = () => (
  <div className="aboutPage">
    <Paper style={{backgroundColor: "#96b397", color:'#1a237e'}}>
      <div className="inAbout">
      <p>
        Welcome to B.Y.O. This is an event planning app designed to track the attendees allergies and dietary restrctions. 
        A user can set up a profile and their restrictions will automatically be listed in any event they RSVP to. The user's
        can modify their profile if they need to and the most up to date information will display in the events. Both hosts and other guests of the 
        event can easily see what allergies and restrictions they should be mindful of while planning any dishes they might bring. Guests 
        with restrictions can check the list of proposed foods and have a good idea if there will be foods they can eat or if they need to 
        plan to bring something else they can eat.  
      </p>
      </div>
    </Paper>
  </div>
);

export default AboutPage;
