import React, { Component } from 'react';


import { connect } from 'react-redux';
import { Button, TextField, Paper, Typography } from '@material-ui/core';

import moment from 'moment';


class userHome extends Component {
    state={
      
    }
    componentDidMount(){
        this.props.dispatch({type: `FETCH_INVITES`});
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
