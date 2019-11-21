import React, { Component } from 'react';


import { connect } from 'react-redux';
import { Button, TextField, Paper, Typography, Card, CardContent, CardActionArea, CardActions } from '@material-ui/core';

import moment from 'moment';


class userHome extends Component {
    state={
      
    }
    componentDidMount(){
        this.props.dispatch({type: `FETCH_INVITES`});
        this.props.dispatch({type: 'FETCH_ATTENDING'});
    }

        //update user event details
    // updateInput=(event,property) =>{
    //     //console.log('in update input', property, event.target.value)
    //     this.setState({
    //         ...this.state,
    //         [property]: event.target.value,
    //     });
    // }
    //send all changes to database
    createEvent=()=>{
     console.log('in create event');
    }

    accceptInvite=(id)=>{
        console.log('event: ', id);
        this.props.dispatch({type:'FETCH_INVITE_ACCEPT', payload:{eventId: id}});
        
    }

        render() {
            return (
                <>
                <div className="userHome">
                    <div className="alerts">
                        <Typography>You have the following waiting event invites:</Typography>
                        {this.props.eventInvites.map(event=>{
                           return <li key={event.id}>
                                    {event.title} which is starting {moment(event.start_time).format('MMM Do YY h:mm a')}
                                    <Button size="small"
                                    variant="contained"
                                    color="primary"
                                    onClick={()=>this.accceptInvite(event.id)}
                                    >Accept Invite</Button>
                            </li>
                        })}
                    </div>
                    <div className="userHome-left">
                    <Paper><h2>Events you're Attending</h2></Paper>
                    <div styles="width:150px;height:150px;line-height:3em;overflow:auto;padding:5px;">
                        {this.props.eventAttending.map(event=>{
                            return <Card className="eventCard">
                            <CardActionArea>
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  {event.title}
                                </Typography>
                                <div className="dateDisplay">
                                    <h4>{moment(event.start_time).format('MMM')}, 
                                    {moment(event.start_time).format('YYYY')}
                                    </h4>
                                    <div className="dayDisplay">
                                        {moment(event.start_time).format('DD')}
                                    </div>
                                </div>
                                
                                <Typography variant="body2" color="textSecondary" component="p">
                                  {event.details}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions>
                              <Button 
                              size="small" 
                              onClick={this.removeRSVP}
                              variant="outlined"
                              color="primary">
                                Remove RSVP
                              </Button>
                              <Button 
                              onClick=
                              size="small" 
                              variant="contained"
                              color="primary">
                                See More Details
                              </Button>
                            </CardActions>
                          </Card>
                        })}
                    </div>
                    </div>
                    <div className="userHome-right">
                    <Paper><h2>Events you're Hosting</h2></Paper>
                    <div styles="width:150px;height:150px;line-height:3em;overflow:auto;padding:5px;">
                    
                    <Button
                    color="primary"
                    variant="contained"
                    onClick={this.createEvent}
                    >Create Event</Button>
                    </div>
                    </div>
               </div>
            </>
            );
        }
    }



    const mapReduxStateToProps = (reduxState) => {
        return reduxState;
    }

    export default connect(mapReduxStateToProps)(userHome);
