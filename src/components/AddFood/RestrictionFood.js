import React, { Component } from 'react';


import { connect } from 'react-redux';
import { Button, TextField, Card, CardActionArea, Typography} from '@material-ui/core';
import { actionChannel } from '@redux-saga/core/effects';






class restrictionFood extends Component {
    //handles YES button and sets the restriction to false
    falseClick=()=>{
        this.props.dispatch({type:'SET_NEW_RESTRICTION', payload: {id: this.props.currentRes.id, bool: false, question: this.props.currentRes.question_word}});
        this.props.next();
    }

    trueClick=()=>{
        this.props.dispatch({type:'SET_NEW_RESTRICTION', payload: {id: this.props.currentRes.id, bool: true, question: this.props.currentRes.question_word}});
        this.props.next();
    }

    notSureClick=()=>{
        this.props.dispatch({type:'SET_NEW_RESTRICTION', payload: {id: this.props.currentRes.id, bool: 'not sure', question: this.props.currentRes.question_word}});
        this.props.next();
    }

        render() {
            return (
                <Card style={{backgroundColor: '#8aacc8'}}>
                    <div className="foodForm">
                    <h2>Does this food contain {this.props.currentRes.question_word}?</h2>
                   <Typography>{this.props.currentRes.details}</Typography>
                   <CardActionArea>
                       <Button
                       variant="outlined"
                       color="primary"
                       //disabled={this.props.newFood.restriction.includes({id: this.props.currentRes.id, bool: true})}
                       onClick={this.falseClick}>
                           YES
                       </Button>
                       <Button
                        variant="outlined"
                        color="primary"
                        onClick={this.trueClick}>
                           NO
                       </Button>
                       <Button
                        variant="outlined"
                        color="primary"
                        onClick={this.notSureClick}>
                           NOT SURE
                       </Button>
                   </CardActionArea>
                   {JSON.stringify(this.props, null, 2)}
                   </div>
               </Card>
            );
        }
    }

    function mapReduxStateToProps(reduxState) {
        return reduxState
   } 

   
    export default connect(mapReduxStateToProps)(restrictionFood);
