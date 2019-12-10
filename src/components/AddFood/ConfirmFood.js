import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Typography} from '@material-ui/core';

class confirmFood extends Component {
    cancelDialog=()=>{
        //clean up the newFood reducer and close the dialog
        this.props.dispatch({type: 'CLEAR_NEW_FOOD'});
        this.props.close();
    }

    submitFood=()=>{
        const data={
            ...this.props.newFood,
            eventId: this.props.selectedEvent.id,
        };
        // for debug:
        //console.log('in food submit with', data)
        //send the new food post
        this.props.dispatch({type: 'FETCH_ADD_FOOD', payload: data});
        //clear out the data held in the newFood reducer
        this.props.dispatch({type: 'CLEAR_NEW_FOOD'});
        //close dialog
        this.props.close();
    }
        render() {
            return (
                <Card style={{backgroundColor: '#8aacc8'}}>
                    <div className="foodForm">
                    <h2>Does this information look correct?</h2>
                   <Typography>Name of Dish: {this.props.newFood.name}</Typography>
                   <Typography>Ingredients: {this.props.newFood.ingredients}</Typography>
                   {this.props.newFood.restriction.map(res=>{
                       return <Typography>Does this contain {res.question}? {res.bool==='not sure'?'Not Sure':(res.bool?'No':'Yes')}</Typography>
                   })}
                   <Button
                   variant="contained"
                   color="primary"
                   onClick={this.submitFood}
                   >Add this Food</Button>
                   <Button
                   variant="outlined"
                   color="primary"
                   onClick={this.cancelDialog}>Cancel Create Food</Button>
                   </div>
               </Card>
            );
        }
    }

    function mapReduxStateToProps(reduxState) {
        return reduxState
   } 

   
    export default connect(mapReduxStateToProps)(confirmFood);
