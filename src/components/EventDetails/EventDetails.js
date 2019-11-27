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
    deleteFood=()=>{
        console.log('in delete food');
    }

        render() {
            return (
                <>
                <div className="eventDetails">
                    <div className="alerts">
                        <Typography>Alerts! {this.props.selectedEvent.host_messages}</Typography>
                    </div>
                    <div className="basicDetail">
                    <h1>{this.props.selectedEvent.title}</h1>
                    <Typography>Description: {this.props.selectedEvent.description}</Typography>
                    <Typography>Location: {this.props.selectedEvent.location}</Typography>
                    <Typography>Date: {moment(this.props.selectedEvent.start_time).format('MM/DD/YYYY')}</Typography>
                    <Typography>Time: {moment(this.props.selectedEvent.start_time).format('h:mm a')}-{moment(this.props.selectedEvent.end_time).format('h:mm a')}</Typography>
                    </div>
                    <div className="flex-container">
                    <div className="eventDetail-left">
                    <Paper className="display">
                        <h2>Attendees</h2>  
                        <h3>Total: {this.props.detailCount.count}</h3>

                        <div className="left-scroll" styles={"width:150px;height:150px;line-height:3em;overflow:auto;padding:5px;"}>
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
                    </div>

                    <div className="eventDetail-right">
                    <Paper className="display">
                        <h2>Foods at this Event:</h2>
                        <div className="right-scroll" styles="width:150px;height:150px;line-height:3em;overflow:auto;padding:5px;">
                        {/* <theader>
                            <tr>
                                <th>
                                    Foods at this Event: 
                                </th>
                            </tr>
                        </theader> */}
                        {this.props.eventFood.map(food=>{
                           return <tr key={food.id}> 
                               <td>{food.name}</td>
                                    <ul>
                                        {food.restriction.map(res=>{ 
                                            if(res!==null){
                                                return <li>{res}</li>
                                            } 
                                        })} 
                                    </ul>
                               <td>
                               {food.user_id==this.props.user.id?<Button variant="outlined" color="primary" onClick={this.deleteFood}>Delete</Button>:''}
                               </td>
                           </tr>
                        })}
                        </div>
                    </Paper>
                    </div>
                    </div>
                </div>
                    <div className="detailActionArea">
                        <DetailFooter close={this.closeDialog}/>
                    </div>
            </>
            );
        }
    }



    const mapReduxStateToProps = (reduxState) => {
        return reduxState;
    }

    export default connect(mapReduxStateToProps)(userHome);
