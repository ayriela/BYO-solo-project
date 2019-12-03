import React, { Component } from 'react';


import { connect } from 'react-redux';
import { Checkbox, Button, Paper } from '@material-ui/core';

import './EditProfile.css';




class editProfile extends Component {
    state={
        username: this.props.user.username,
        email: this.props.user.email,
    }

    componentDidMount() {
        //this.props.dispatch({ type: 'FETCH_RESTRICTION', payload: this.props.user });
        } 
        //update redux state for checkboxes
    handleChange = (event) => {
            console.log('in handle change', event.target.name);
            this.props.dispatch({type: 'UPDATE_RESTRICTION', payload: {id: event.target.name}});
        }
        //update value for username or email

        //update user profile details
    updateInput=(event,property) =>{
        //console.log('in update input', property, event.target.value)
        this.setState({
            ...this.state,
            [property]: event.target.value,
        });
    }
    //send all changes to database
    submitProfile=()=>{
        
        const profile={
            id: this.props.user.id,
            username: this.state.username,
            email: this.state.email,
            restriction: this.props.restriction, 
        };
        //console.log('in Submit', profile);
        this.props.dispatch({type: 'FETCH_PROFILE_UPDATE', payload: profile});
        this.props.history.push('/home');
    }

    render() {
        return (
            <div className="editProfile">
                <Paper style={{backgroundColor: '#c8e6c9', color:'#1a237e'}}>
                    <div className="form">
                        <h2>Update your Profile:</h2>
                        <p>Please Select All the Allergies or Dietary Restrictions that you have.</p>
                        <p>Click Update Profile to save your changes.</p>
                        <div className="checkboxArray">
                            {this.props.restriction.map(item => {
                                return <><label key={item.id}>
                                    {item.category}
                                    <Checkbox
                                        name={item.id}
                                        checked={item.active}
                                        color="primary"
                                        variant="contained"
                                        onChange={(event) => this.handleChange(event)} />
                                </label> <br></br> </>
                            })}
                        </div>
                        <div className="userInfo">
                            <label>
                                Username:
                                    <input
                                    value={this.state.username}
                                    onChange={(event) => this.updateInput(event, "username")}></input>
                            </label>
                            <label>
                                Email:
                                    <input
                                    value={this.state.email}
                                    onChange={(event) => this.updateInput(event, "email")}></input>
                            </label>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={this.submitProfile}
                            >Update Profile</Button>
                            {/* {JSON.stringify(this.props.restriction, null, 2)} */}
                        </div>
                    </div>
                </Paper>
            </div>
            );
        }
    }



    const mapReduxStateToProps = (reduxState) => {
        return reduxState;
    }

    export default connect(mapReduxStateToProps)(editProfile);
