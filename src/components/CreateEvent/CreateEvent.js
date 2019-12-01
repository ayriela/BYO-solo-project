import React, { Component } from 'react';


import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';

import moment from 'moment';

// import {
//     MuiPickersUtilsProvider,
//     KeyboardTimePicker,
//     KeyboardDatePicker,
//   } from '@material-ui/pickers';




class createEvent extends Component {
    state={
        title: '',
        description: '',
        date: '',
        startTime:'',
        endTime:'',
        location: '',
        alerts:'',
        invitedEmail:'',
        user: this.props.user.id,
    }
  

        //update user event details
    updateInput=(event,property) =>{
        //console.log('in update input', property, event.target.value)
        this.setState({
            ...this.state,
            [property]: event.target.value,
        });
    }
    //send all changes to database
    submitEvent=()=>{
        //console.log('in submit', this.state);
        //const startDateTime= Date.parse(this.state.date+'T'+this.state.startTime);
        //const endDateTime= Date.parse(this.state.date+'T'+this.state.endTime);
        //  const {
        //     title,
        //     description,
        //     date,
        //     startTime,
        //     endTime,
        //     location,
        //     alerts,
        //     invitedEmail,
        //     user,
        //     startDateTime,
        //     endDateTime,

        const startDateTime = moment(`${this.state.date} ${this.state.startTime}`, 'YYYY-MM-DD HH:mm:ss').format();
        const endDateTime = moment(`${this.state.date} ${this.state.endTime}`, 'YYYY-MM-DD HH:mm:ss').format();

        const allValues={
            ...this.state,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
        }
        
        this.props.dispatch({type:`FETCH_UPDATE_EVENT`, payload: allValues});

        //console.log(startDateTime, endDateTime);
        
        //console.log('in Submit', profile);
        //this.props.dispatch({type: 'FETCH_PROFILE_UPDATE', payload: profile});
    }

        render() {
            return (
                <>
                <div className="eventForm">
                    <label>
                            Title:
                        <TextField 
                        variant="outlined"
                        value={this.state.title} 
                        onChange={(event)=>this.updateInput(event,"title")}></TextField>
                    </label>
                    <label>
                            Description:
                        <TextField
                        variant="outlined"
                        multiline
                        rows="3"
                        value={this.state.description} 
                        onChange={(event)=>this.updateInput(event,"description")}></TextField>
                    </label>
                    <label>
                            Date:
                            {/* <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker"
                                value={this.state.date}
                                onChange={(event)=>this.updateInput(event,"date")}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            /> */}
                        <TextField
                        type="date"
                        variant="outlined"
                        value={this.state.date} 
                        onChange={(event)=>this.updateInput(event,"date")}></TextField> 
                    </label>
                    <label>
                            Start Time:
                        <TextField
                        type="time"
                        variant="outlined"
                        value={this.state.startTime} 
                        onChange={(event)=>this.updateInput(event,"startTime")}></TextField>
                    </label>
                    <label>
                            End Time:
                        <TextField
                        type="time"
                        variant="outlined"
                        value={this.state.endTime} 
                        onChange={(event)=>this.updateInput(event,"endTime")}></TextField>
                    </label>
                    <label>
                            Location:
                        <TextField 
                        variant="outlined"
                        value={this.state.location} 
                        onChange={(event)=>this.updateInput(event,"location")}></TextField>
                    </label>
                    <label>
                            Alert to All Guests:
                        <TextField
                        variant="outlined"
                        multiline
                        rows="6"
                        value={this.state.alerts} 
                        onChange={(event)=>this.updateInput(event,"alerts")}></TextField>
                    </label>
                    <label>
                            Emails to invite:
                        <TextField 
                        variant="outlined"
                        type="email"
                        value={this.state.invitedEmail} 
                        onChange={(event)=>this.updateInput(event,"invitedEmail")}></TextField>
                    </label>
                    <Button
                    color="primary"
                    variant="contained"
                    onClick={this.submitEvent}
                    >Create Event</Button>
               </div>
            </>
            );
        }
    }



    const mapReduxStateToProps = (reduxState) => {
        return reduxState;
    }

    export default connect(mapReduxStateToProps)(createEvent);
