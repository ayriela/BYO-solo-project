import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import { connect } from 'react-redux';
import { Button, Dialog} from '@material-ui/core';

import moment from 'moment';

import AddFood from '../AddFood/AddFood'

// add to calendar requirements
import AddToCalendar from 'react-add-to-calendar';
import './DetailFooter.css';

class detailFooter extends Component {
    //move event into state
    event = {
        title: this.props.selectedEvent.title,
        description: this.props.selectedEvent.description,
        location: this.props.selectedEvent.location,
        startTime: this.props.selectedEvent.start_time,
        endTime: this.props.selectedEvent.end_time,
    };

    state={
        dialog: false,
    }

/*     addFood=()=>{
        console.log('in add food');
    } */

    routeToList=()=>{
        console.log('in route to list');
        this.props.history.push('/userHome');
    }

    //function to open dialog
    openDialog=()=>{
        console.log('in open dialog');
        this.setState({
            dialog: true,
        });
    }

    //function to close dialog, reset redux, and route to home
    closeDialog=()=>{
            this.setState({
                dialog: false,
            });
            //reset the redux state
            //this.props.dispatch({type: 'RESET'});
            //this.props.history.push(this.props.direction.f);
    
    }

        render() {
            //for the calendar button style
                let icon = { 'calendar-plus-o': 'left' };
            //let icon = { textOnly: 'none' };
                let items = [
                    { google: 'Google' },
                    { apple: 'Apple' }
                ];
     
            return (
                <>
                <div className="detailFooter-left">
                    <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={this.routeToList}>Return to List</Button>
                    <div className="add-to-calendar">
                    <AddToCalendar 
                        event={this.event}
                        listItems={items} 
                        buttonTemplate={icon}/>
                    </div>
                </div>
                <div className="detailFooter-right">
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={this.openDialog}>Add Food</Button>
                </div>
                <Dialog
                open={this.state.dialog}
                onClose={this.closeDialog}
                >
                {/* <DialogTitle id="alert-dialog-title" style={{backgroundColor:'#CBFAD0'}}>{"Submission Received"}</DialogTitle>
                <DialogContent style={{backgroundColor:'#CBFAD0'}}>
                <DialogContentText id="alert-dialog-description">
                    Thanks for your feedback! </DialogContentText>
                </DialogContent>
                <DialogActions style={{backgroundColor:'#CBFAD0'}}>
                <Button onClick={this.closeDialog} variant="contained" color="primary">
                    Close</Button>
                </DialogActions> */}
                <AddFood close={this.closeDialog}/>
                </Dialog>
                {/*JSON.stringify(this.props, null, 2)*/}
                </>
            );
        }
    }



    const mapReduxStateToProps = (reduxState) => {
        return reduxState;
    }

    export default connect(mapReduxStateToProps)(withRouter(detailFooter));
