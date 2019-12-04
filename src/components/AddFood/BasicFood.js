import React, { Component } from 'react';


import { connect } from 'react-redux';
import { Button, TextField, Card} from '@material-ui/core';






class basicFood extends Component {
        render() {
            return (
                <>
                <Card style={{backgroundColor: '#8aacc8'}}>
                    <div className="foodForm">
                    <label>
                            Name your dish:
                        <TextField 
                        variant="outlined"
                        type="text"
                        value={this.props.newFood.name} 
                        onChange={(event)=>this.props.dispatch({type: 'SET_NEW_FOOD_NAME', payload: {value: event.target.value}})}></TextField>
                    </label>
                    <br></br>
                    <label>
                            Ingredients (optional):
                        <TextField
                        variant="outlined"
                        multiline
                        rows="4"
                        value={this.props.newFood.ingredients} 
                        onChange={(event)=>this.props.dispatch({type: 'SET_NEW_FOOD_INGREDIENT', payload: {value: event.target.value}})}></TextField>
                    </label>
                    </div>
               </Card>
            </>
            );
        }
    }



    const mapReduxStateToProps = (reduxState) => {
        return reduxState;
    }

    export default connect(mapReduxStateToProps)(basicFood);
