import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Paper, Typography} from '@material-ui/core';

import moment from 'moment';

import DetailFooter from '../DetailFooter/DetailFooter';
//import AddFood from '../AddFood/AddFood';

import './EventDetails.css'


class userHome extends Component {
    componentDidMount(){
        //this.props.dispatch({type: `FETCH_INVITES`});
        //this.props.dispatch({type: 'FETCH_ATTENDING'});
        //this.props.dispatch({type: 'FETCH_HOSTING'});
        //this.props.dispatch({type: 'FETCH_ALL_RESTRICTIONS'});
    }

    deleteFood=(id)=>{
        //console.log('in delete food');
        //add call to delete the food
        const data={
            id: id,
            eventId: this.props.selectedEvent.id,
        };
        this.props.dispatch({type: 'FETCH_DELETE_FOOD', payload: data});

    }

        render() {
            return (
                <>
                <div className="eventDetails">
                    <div className="alerts">
                        <Typography style={{color: '#97b498', textAlign: "center"}} variant="h6">Alerts! {this.props.selectedEvent.host_messages}</Typography>
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
                    <Paper className="display" style={{backgroundColor: '#c8e6c9'}}>
                        <h2 className="attendeeHeader">Attendees</h2>  
                        <h2 className="attendeeHeader, attendeeRight">Total: {this.props.detailCount.count}</h2>

                        <div className="scrollDetail">
                        <table className="resTable">
                            <tr className="resTable">
                                <th className="leftColumn">
                                    Restriction Name:
                                </th>
                                <th className="rightColumn">
                                    Guests with restriction:
                                </th>
                            </tr>
                        {/* loop through list of guest restrictions and counts */}
                        {this.props.detailRestriction.map(res=>{
                           return <tr key={res.id} className="resTable"> 
                               <td className="leftColumn">{res.category}</td>
                               <td className="rightColumn">{res.total_with_allergy}</td>
                           </tr>
                        })}
                        </table>
                        </div>
                    </Paper>
                    </div>

                    <div className="eventDetail-right">
                    <Paper className="display" style={{backgroundColor: '#c8e6c9'}}>
                        <h2>Foods at this Event:</h2>
                        <div className="scrollDetail">
                        <table className="resTable">
                            <tr className="resTable">
                                <th className="leftColumn">
                                    Food title and restriction(s) it's safe for: 
                                </th>
                            </tr>
                        {this.props.eventFood.map(food=>{
                           return <tr key={food.id}> 
                               <td>{food.name}</td>
                                    <ul>
                                        {food.restriction.map(res=>{ 
                                            if(res!==null){
                                                return <li>{res}</li>
                                            } else {
                                                return null
                                            }
                                        })} 
                                    </ul>
                               <td>
                               {food.user_id===this.props.user.id?<Button variant="outlined" color="primary" onClick={()=>this.deleteFood(food.id)}>Delete</Button>:''}
                               </td>
                           </tr>
                        })}
                        </table>
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
