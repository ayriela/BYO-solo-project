import React, { Component } from 'react';


import { connect } from 'react-redux';
import { Button, TextField, Paper, Typography, Card, CardContent, CardActionArea, CardActions , Dialog} from '@material-ui/core';

import moment from 'moment';

import DetailFooter from '../DetailFooter/DetailFooter';
import AddFood from '../AddFood/AddFood';

import './EventDetails.css'

class userHome extends Component {
    componentDidMount(){
        //this.props.dispatch({type: `FETCH_INVITES`});
        //this.props.dispatch({type: 'FETCH_ATTENDING'});
        //this.props.dispatch({type: 'FETCH_HOSTING'});
        //this.props.dispatch({type: 'FETCH_ALL_RESTRICTIONS'});
    }

   
    //send all changes to database
    createEvent=()=>{
     console.log('in create event');
    }

    accceptInvite=(id)=>{
        console.log('event: ', id);
        //this.props.dispatch({type:'FETCH_INVITE_ACCEPT', payload:{eventId: id}});
        
    }

    // removeRSVP=(id)=>{
    //     console.log('in remove rsvp', id);
    // }

    // cancelEvent=(id)=>{
    //     console.log('in cancel event', id);
    // }

    // routeToDetails=(id)=>{
    //     console.log('in route to details', id);
    // }

    //function to open dialog
    //  openDialog=()=>{
    //     this.setState({
    //         dialog: true,
    //     });
    // }
    // //function to close dialog, reset redux, and route to home
    // closeDialog=()=>{
    //     this.setState({
    //         dialog: false,
    //     });
    //     //reset the redux state
    //     //this.props.dispatch({type: 'RESET'});
    //     //this.props.history.push(this.props.direction.f);

    // }

        render() {
            return (
                <>
                <div className="eventDetails">
                    <h1>{this.props.selectedEvent.title}</h1>
                    <h5>Description: {this.props.selectedEvent.description}</h5>
                    <h5>Location: {this.props.selectedEvent.location}</h5>
                    <h5>Date: {moment(this.props.selectedEvent.start_time).format('MM/DD/YYYY')}</h5>
                    <h5>Time: {moment(this.props.selectedEvent.start_time).format('h:mm a')}-{moment(this.props.selectedEvent.end_time).format('h:mm a')}</h5>

                    <div className="alerts">
                        <Typography>Alerts! {this.props.selectedEvent.host_messages}</Typography>
                    </div>
                    <div className="eventDetail-left">
                    <Paper>
                        <h2>Attendees</h2>  
                        <h3>Total: {this.props.detailCount.count}</h3>

                        <div styles="width:150px;height:150px;line-height:3em;overflow:auto;padding:5px;">
                        <theader>
                            <tr>
                                <th>
                                    Restriction Name:
                                </th>
                                <th>
                                    Attendees with this Restriction:
                                </th>
                            </tr>
                        </theader>
                        {this.props.detailRestriction.map(res=>{
                           return <tr key={res.id}> 
                               <td>{res.category}</td>
                               <td>{res.total_with_allergy}</td>
                           </tr>
                        })}
                    </div>
                    </Paper>

                    <div className="eventDetail-right"></div>
                    <Paper>
                        <h2>Foods will go Here...Eventually</h2>
                        <div styles="width:150px;height:150px;line-height:3em;overflow:auto;padding:5px;">
                 
                        </div>
                    </Paper>
                    
                    </div>
                    <div className="detailActionArea">
                        <DetailFooter close={this.closeDialog}/>
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
