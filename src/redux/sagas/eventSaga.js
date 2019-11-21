import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


//fired when the user hits the edit profile or add food pages
function* fetchEventUpdate(action) {
    try {
        const info=action.payload;
        console.log(info, 'this is from eventSaga')
    //send event to datbase
      yield axios.post('/event', info);
      
    //will need to get events list for user and host info again

    } catch (error) {
        console.log('Error adding event:', error);
    }
  }

  /* function* restrictionUserFetch(action) {
    try {
    //get major restrictions from database
      const restrictions = yield axios.get(`/restriction/${action.payload.id}`);
    //set to redux state
      yield put({ type: 'SET_RESTRICTION', payload: restrictions.data });

    } catch (error) {
        console.log('Error getting restrictions:', error);
        //yield put({type: 'REGISTRATION_FAILED'});
    }
  }
   */
  function* eventSaga() {
    yield takeEvery('FETCH_UPDATE_EVENT', fetchEventUpdate);
    //yield takelatest('FETCH_USER_RESTRICTION', userRestrictionFetch);
  }
  
  export default eventSaga;