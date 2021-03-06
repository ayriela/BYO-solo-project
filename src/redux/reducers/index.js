import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import restriction from './restrictionReducer';
import eventInvites from './eventInviteReducer';
import eventAttending from './eventAttendingReducer';
import eventHosting from './eventHostingReducer';
import detailCount from './detailCountReducer';
import detailRestriction from './detailRestrictionReducer';
import selectedEvent from './selectedEventReducer';
import allRestriction from './allRestrictionReducer';
import newFood from './newFoodReducer';
import eventFood from './eventFoodReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  restriction, 
  eventInvites,
  eventAttending,
  eventHosting,
  detailCount,
  detailRestriction,
  selectedEvent,
  allRestriction,
  newFood,
  eventFood,
});

export default rootReducer;
