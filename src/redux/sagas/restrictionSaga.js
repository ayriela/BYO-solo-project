import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


//fired when the user hits the edit profile or add food pages
function* restrictionFetch(action) {
    try {
    //get major restrictions from database
      const restriction = yield axios.get(`/restriction/${action.payload.id}`);
    //set to redux state
      yield put({ type: 'SET_RESTRICTION', payload: restriction.data });

    } catch (error) {
        console.log('Error getting restrictions:', error);
    }
  }

//get all the restriction detail
function* allRestrictionFetch() {
  try {
  //get major restrictions from database
    const restriction = yield axios.get(`/restriction/all`);
  //set to redux state
    yield put({ type: 'SET_RESTRICTION_DETAIL', payload: restriction.data });

  } catch (error) {
      console.log('Error getting all restriction detail:', error);
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
  function* restrictionSaga() {
    yield takeLatest('FETCH_RESTRICTION', restrictionFetch);
    yield takeEvery('FETCH_ALL_RESTRICTION', allRestrictionFetch)
    //yield takelatest('FETCH_USER_RESTRICTION', userRestrictionFetch);
  }
  
  export default restrictionSaga;