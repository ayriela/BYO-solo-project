import React from 'react';

import {Paper} from '@material-ui/core';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div className="aboutPage">
    <Paper style={{backgroundColor: "#96b397"}}>
      <p>
        Welcome to B.Y.O. This application is an event hosting app designed to track the attendees allergies and dietary restrctions. 
        Set up your profile and your restrictions will show up on any event to which you RSVP.
      </p>
    </Paper>
  </div>
);

export default AboutPage;
