import React, { Component } from 'react';


import { connect } from 'react-redux';
import { Button, TextField, Card, CardActionArea, Typography} from '@material-ui/core';
import { actionChannel } from '@redux-saga/core/effects';






class restrictionFood extends Component {
  
   
    // setFalse=()=>{
    //     this.setState({
    //             boolean: false,
    //     });
    // }

    // setTrue=()=>{
    //     this.setState({
    //         boolean: true,
    //     });
    // }
    trueClick=()=>{
       
        this.props.dispatch({type:'SET_NEW_RESTRICTION', payload: {id: this.props.currentRes.id, bool: true, question: this.props.currentRes.question_word}});
       
        
    }

        render() {
            return (
                <Card>
                    <h2>Does this food contain {this.props.currentRes.question_word}?</h2>
                   <Typography>{this.props.currentRes.details}</Typography>
                   <CardActionArea>
                       <Button
                       variant="outlined"
                       color="primary"
                       //disabled={this.props.newFood.restriction.includes({id: this.props.currentRes.id, bool: true})}
                       onClick={this.trueClick}>
                           YES
                       </Button>
                       <Button
                        variant="outlined"
                        color="primary"
                        onClick={()=>this.props.dispatch({type:'SET_NEW_RESTRICTION', payload: {id: this.props.currentRes.id, bool: false, question: this.props.currentRes.question_word}})}>
                           NO
                       </Button>
                       <Button
                        variant="outlined"
                        color="primary"
                        onClick={()=>this.props.dispatch({type:'SET_NEW_RESTRICTION', payload: {id: this.props.currentRes.id, bool: 'not sure', question: this.props.currentRes.question_word}})}>
                           NOT SURE
                       </Button>
                   </CardActionArea>
               </Card>
            );
        }
    }

    function mapReduxStateToProps(reduxState) {
        return reduxState
   } 

   
    export default connect(mapReduxStateToProps)(restrictionFood);
