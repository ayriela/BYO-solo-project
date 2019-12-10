import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import { connect } from 'react-redux';
import { Button, Paper, Typography, Card, CardContent, CardActionArea, CardActions } from '@material-ui/core';

import moment from 'moment';

import './UserHome.css';


class userHome extends Component {
    state={
      
    }
    componentDidMount(){
        this.props.dispatch({type: `FETCH_INVITES`});
        this.props.dispatch({type: 'FETCH_ATTENDING'});
        this.props.dispatch({type: 'FETCH_HOSTING'});
          //and get the full restriction list information
        this.props.dispatch({type: 'FETCH_ALL_RESTRICTION'});
    }

    //rout to the create event page
    createEvent=()=>{
     //console.log('in create event');
     this.props.history.push('/createEvent');
    }

    //update the invite and add this to your events 
    accceptInvite=(id)=>{
        //console.log('event: ', id);
        this.props.dispatch({type:'FETCH_INVITE_ACCEPT', payload:{eventId: id}});
    }

    //update the invite and reject this event
    removeRSVP=(id)=>{
        //console.log('in remove rsvp', id);
        this.props.dispatch({type:'FETCH_INVITE_REJECT', payload:{eventId: id}});
    }

    //delete the event you're hosting from the database 
    cancelEvent=(id)=>{
        //console.log('in cancel event', id);
        this.props.dispatch({type:'FETCH_CANCEL_EVENT', payload:{eventId: id}});
    }

    routeToDetails=(eventDetail)=>{
        //pick the selected event and gather the info for this page
        this.props.dispatch({type: 'SET_SELECTED_EVENT', payload: eventDetail});
        //console.log('in route to details', eventDetail);
        this.props.dispatch({type: 'FETCH_DETAIL_COUNT', payload:{id: eventDetail.id}});
        this.props.dispatch({type: 'FETCH_DETAIL_RESTRICTION', payload:{id: eventDetail.id}});
        this.props.dispatch({type: 'FETCH_EVENT_FOOD', payload:{id: eventDetail.id}});
        //send the user to the eventDetails route
        this.props.history.push('/eventDetails');
        
    }

        render() {
            return (
                <>
                <div className="userHome">
                    
                      {/* if there is an event active show the list of pending invites */}
                      {this.props.eventInvites[0]?
                      <div className="alerts">
                      <Typography>You have the following pending event invites:</Typography>
                      <ul>
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
                      </ul> </div>: <p></p>
                      }
                      
                        
                    
                    <div className="flex-container">
                    <div className="userHome-left">
                    <Paper className="event-paper" style={{backgroundColor: '#c8e6c9'}}>
                      <h2>Events you're Attending</h2>
                      <div className="scroll">
                        {this.props.eventAttending.map(event=>{
                            return <Card className="eventCard" style={{backgroundColor: '#eeffff'}}>
                            <CardActionArea>
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h1" style={{color:'#1a237e'}}>
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
                              onClick={()=>this.removeRSVP(event.id)}
                              variant="outlined"
                              color="primary">
                                Remove RSVP
                              </Button>
                              <Button 
                              onClick={()=>this.routeToDetails(event)}
                              size="small" 
                              variant="contained"
                              color="primary">
                                See More Details
                              </Button>
                            </CardActions>
                          </Card>
                        })}
                    </div>
                    </Paper>
                    
                    </div>
                    <div className="userHome-right">
                    <Paper className="event-paper" style={{backgroundColor: '#c8e6c9'}}>
                      <h2>Events you're Hosting</h2>
                      <div className="scroll">
                    {this.props.eventHosting.map(event=>{
                            return <Card className="eventCard" style={{backgroundColor: '#eeffff'}}>
                            <CardActionArea>
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h1" style={{color:'#1a237e'}}>
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
                              onClick={()=>this.cancelEvent(event.id)}
                              variant="outlined"
                              color="primary">
                                Cancel Event
                              </Button>
                              <Button 
                              onClick={()=>this.routeToDetails(event)}
                              size="small" 
                              variant="contained"
                              color="primary">
                                See More Details
                              </Button>
                            </CardActions>
                          </Card>
                        })}
                    <Button
                    className="createButton"
                    color="primary"
                    variant="contained"
                    onClick={this.createEvent}
                    >Create Event</Button>
                    </div>
                    </Paper>
                   
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

    export default connect(mapReduxStateToProps)(withRouter(userHome));
