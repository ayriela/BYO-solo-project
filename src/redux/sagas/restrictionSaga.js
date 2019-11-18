import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


//fired when the user hits the edit profile or add food pages
function* restrictionFetch(action) {
    try {
    //get major restrictions from database
      const restrictions = yield axios.get('/restriction');
    //set to redux state
      yield put({ type: 'SET_RESTRICTION', payload: response.data });

    } catch (error) {
        console.log('Error getting restrictions:', error);
        //yield put({type: 'REGISTRATION_FAILED'});
    }
  }
  
  function* restrictionSaga() {
    yield takeLatest('FETCH_RESTRICTION', restrictionFetch);
  }
  
  export default restrictionSaga;