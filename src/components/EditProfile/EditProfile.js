import React, { Component } from 'react';


import { connect } from 'react-redux';
import { Checkbox, Button } from '@material-ui/core';




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
            console.log('in handle change', event.target.id);
            this.props.dispatch({type: 'UPDATE_RESTRICTION', payload: {id: event.target.name}});
        }
        //update value for username or email

        //update user profile details
    updateInput=(event,property) =>{
        console.log('in update input', property, event.target.value)
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
        console.log('in Submit', profile);
        this.props.dispatch({type: 'FETCH_PROFILE_UPDATE', payload: profile});
    }

        render() {
            return (
                <>
                <div className="checkboxArray">
                    {this.props.restriction.map(item=>{
                        return <label key={item.id}>
                            {item.category}
                            <Checkbox  
                            name={item.id} 
                            checked={item.active}
                            color="primary"
                            variant="contained"
                            onChange={(event)=>this.handleChange(event)} />
                        </label>})}
               </div>
               <div className="userInfo">
               <label>
                   Username:
                    <input 
                    value={this.state.username} 
                    onChange={(event)=>this.updateInput(event,"username")}></input>
                </label>
               <label>
                   Email:
                    <input 
                    value={this.state.email} 
                    onChange={(event)=>this.updateInput(event,"email")}></input>
                </label>
                <Button
                color="primary"
                variant="contained"
                onClick={this.submitProfile}
                >Update Profile</Button>
                    {/* {JSON.stringify(this.props.restriction, null, 2)} */}
                </div>
                </>
            );
        }
    }



    const mapReduxStateToProps = (reduxState) => {
        return reduxState;
    }

    export default connect(mapReduxStateToProps)(editProfile);
