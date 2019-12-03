import React, { Component } from 'react';


import { connect } from 'react-redux';
import { Button, TextField, Paper } from '@material-ui/core';

import { ReactMultiEmail, isEmail } from 'react-multi-email';

import moment from 'moment';
import './CreateEvent.css';

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
        //invitedEmail:'',
        emails: [],
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

        const startDateTime = moment(`${this.state.date} ${this.state.startTime}`, 'YYYY-MM-DD HH:mm:ss').format();
        const endDateTime = moment(`${this.state.date} ${this.state.endTime}`, 'YYYY-MM-DD HH:mm:ss').format();

        const allValues={
            ...this.state,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
        }
        
        this.props.dispatch({type:`FETCH_UPDATE_EVENT`, payload: allValues});

        
        //send user back to their Home
        this.props.history.push('/home');
    }

        render() {
            const { emails } = this.state.emails;
            return (
                <>
                <div className="eventForm">
                    <Paper style={{backgroundColor: '#c8e6c9', color:'#1a237e'}}>
                    <div className="form">
                    <h2>Set up your Event:</h2> 
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
                            Location:
                        <TextField 
                        variant="outlined"
                        value={this.state.location} 
                        onChange={(event)=>this.updateInput(event,"location")}></TextField>
                    </label>
                    <br></br>
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
                    <br></br>
                    <label>
                            Alert to All Guests:
                        <TextField
                        variant="outlined"
                        multiline
                        rows="6"
                        value={this.state.alerts} 
                        onChange={(event)=>this.updateInput(event,"alerts")}></TextField>
                    </label>
                    {/* <label>
                            Emails to invite: */}
                        {/* <TextField 
                        variant="outlined"
                        type="email"
                        value={this.state.invitedEmail} 
                        onChange={(event)=>this.updateInput(event,"invitedEmail")}></TextField> */}
                            <ReactMultiEmail
                                placeholder="Add your guest's email to send invite."
                                emails={emails}
                                onChange={(_emails: string[]) => {
                                    this.setState({ emails: _emails });
                                }}
                                validateEmail={email => {
                                    return isEmail(email); // return boolean
                                }}
                                getLabel={(
                                    email: string,
                                    index: number,
                                    removeEmail: (index: number) => void,
                                ) => {
                                    return (
                                        <div data-tag key={index}>
                                            {email}
                                            <span data-tag-handle onClick={() => removeEmail(index)}>
                                                ×
                                            </span>
                                        </div>
                                    );
                                }}
                            />
                        {/* </label> */}
                    <div className="createEventButton">
                    <Button
                    color="primary"
                    variant="contained"
                    onClick={this.submitEvent}
                    style={{position: 'right'}}
                    >Create Event</Button>
                    </div>
                    </div>
                    </Paper>
               </div>
            </>
            );
        }
    }



    const mapReduxStateToProps = (reduxState) => {
        return reduxState;
    }

    export default connect(mapReduxStateToProps)(createEvent);
