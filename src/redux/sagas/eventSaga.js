import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


//fired when the user hits the edit profile or add food pages
function* fetchEventUpdate(action) {
    try {
        const info=action.payload;
        //console.log(info, 'this is from eventSaga')
    //send event to datbase
      yield axios.post('/event', info);
      yield put({type: 'FETCH_HOSTING'})
      
    //will need to get events list for user and host info again

    } catch (error) {
        console.log('Error adding event:', error);
    }
  }

  
  //grabs list of all the events the user is invited to
   function* fetchInvites(){
       try{
        const invites=yield axios.get('/event/invites');
        yield put({ type: 'SET_INVITES', payload: invites.data});
       } catch (error) {
        console.log('Error getting users invites:', error);
        }
    }

    //user accepts the invite 
    function* fetchInviteAccept(action){
        try {
            yield axios.put('/event/accept', action.payload);
            yield put({type: 'FETCH_INVITES'});
            yield put({type: 'FETCH_ATTENDING'})
        } catch (error) {
            console.log('Error accepting the invitation:', error);
        }
    }

      //user turns down the invite 
      function* fetchInviteReject(action){
        try {
            yield axios.put('/event/reject', action.payload);
            yield put({type: 'FETCH_ATTENDING'})
        } catch (error) {
            console.log('Error rejecting the invitation:', error);
        }
    }

      //host cancels the whole event 
      function* fetchCancelEvent(action){
          console.log('in cancel event', action.payload.eventId);
        try {
            yield axios.delete(`/event/${action.payload.eventId}`);
            yield put({type: 'FETCH_HOSTING'});
        } catch (error) {
            console.log('Error canceling the event:', error);
        }
    }

    //grab the list of all events the user is attending 
    function* fetchAttending(){
        try{
         const attending=yield axios.get('/event/attending');
         yield put({ type: 'SET_ATTENDING', payload: attending.data});
        } catch (error) {
         console.log('Error getting users invites:', error);
         }
     }

     //grab the list of all events the user is hosting
     function* fetchHosting(){
        try{
         const hosting=yield axios.get('/event/hosting');
         yield put({ type: 'SET_HOSTING', payload: hosting.data});
        } catch (error) {
         console.log('Error getting users invites:', error);
         }
     }

  function* eventSaga() {
    yield takeEvery('FETCH_UPDATE_EVENT', fetchEventUpdate);
    yield takeEvery('FETCH_INVITES', fetchInvites);
    yield takeEvery('FETCH_INVITE_ACCEPT', fetchInviteAccept);
    yield takeEvery('FETCH_ATTENDING', fetchAttending);
    yield takeEvery('FETCH_HOSTING', fetchHosting);
    yield takeEvery('FETCH_INVITE_REJECT', fetchInviteReject);
    yield takeEvery('FETCH_CANCEL_EVENT', fetchCancelEvent);
    //yield takelatest('FETCH_USER_RESTRICTION', userRestrictionFetch);
  }
  
  export default eventSaga;