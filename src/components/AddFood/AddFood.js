import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {connect} from 'react-redux';

import BasicFood from './BasicFood';
import RestrictionFood from './RestrictionFood';
import ConfirmFood from './ConfirmFood';


const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
});

function AddFood(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };


  const restrictions=props.allRestriction.map((res,i)=>{
      return {index: i+1, component: <RestrictionFood currentRes={res} />}
  })

  const steps=[{
      index: 0,
      component: <BasicFood />
    }
     ,
      ...restrictions,
      {
        index: restrictions.length+1,
        component: <ConfirmFood close={props.close}/>
    },
  ]

  return (
      <div>

        {steps[activeStep].component}
    <MobileStepper
      variant="dots"
      steps={props.allRestriction.length + 2}
      position="static"
      activeStep={activeStep}
      className={classes.root}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep===steps.length-1}>
          Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
      }
    />
    {/* {JSON.stringify(props.newFood, null,2)} */}
    </div>
  );
}
function mapStateToProps(reduxState) {
     return reduxState;
} 
  
 export default connect(mapStateToProps)(AddFood);
