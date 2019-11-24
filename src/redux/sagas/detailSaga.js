import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


  
  //grabs the count of all attendees fired when user hits the event details page
   function* fetchDetailCount(action){
    //    try{
    //     const invites=yield axios.get('/event/invites');
    //     yield put({ type: 'SET_INVITES', payload: invites.data});
    //    } catch (error) {
    //     console.log('Error getting users invites:', error);
    //     }
        try{
            console.log(action.payload, action.payload.id)
            const count=yield axios.get(`/detail/attendee/count/${action.payload.id}`);
            yield put({type: 'SET_DETAIL_COUNT', payload: count.data})
        } catch (error){
            console.log('Error getting detail attendee count:', error);
        }
    }


     //grab the list of all attendees restrictions and counts of these 
     //fired when user hits the event details page
     function* fetchDetailRestriction(action){
        // try{
        //  const hosting=yield axios.get('/event/hosting');
        //  yield put({ type: 'SET_HOSTING', payload: hosting.data});
        // } catch (error) {
        //  console.log('Error getting users invites:', error);
        //  }

        try{
          const restrictions=yield axios.get(`/detail/attendee/restrictions/${action.payload.id}`);
          yield put({type: 'SET_DETAIL_RESTRICTION', payload: restrictions.data})
      } catch (error){
          console.log('Error getting detail attendee count:', error);
      }
     }

  function* detailSaga() {
    yield takeEvery('FETCH_DETAIL_COUNT', fetchDetailCount);
    yield takeEvery('FETCH_DETAIL_RESTRICTION', fetchDetailRestriction);
    
    //yield takelatest('FETCH_USER_RESTRICTION', userRestrictionFetch);
  }
  
  export default detailSaga;