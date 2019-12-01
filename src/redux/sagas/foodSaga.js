import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


//fired when the user hits the edit profile or add food pages
// function* fetchEventUpdate(action) {
//     try {
//         const info=action.payload;
//         console.log(info, 'this is from eventSaga')
//     //send event to datbase
//       yield axios.post('/event', info);
      
//     //will need to get events list for user and host info again

//     } catch (error) {
//         console.log('Error adding event:', error);
//     }
//   }

  
//   //grabs list of all the events the user is invited to
//    function* fetchInvites(){
//        try{
//         const invites=yield axios.get('/event/invites');
//         yield put({ type: 'SET_INVITES', payload: invites.data});
//        } catch (error) {
//         console.log('Error getting users invites:', error);
//         }
//     }

//     //user accepts the invite 
//     function* fetchInviteAccept(action){
//         try {
//             yield axios.put('/event/accept', action.payload);
//             yield put({type: 'FETCH_INVITES'});
//             yield put({type: 'FETCH_ATTENDING'})
//         } catch (error) {
//             console.log('Error accepting the invitation:', error);
//         }
//     }

//       //user turns down the invite 
//       function* fetchInviteReject(action){
//         try {
//             yield axios.put('/event/reject', action.payload);
//             yield put({type: 'FETCH_ATTENDING'})
//         } catch (error) {
//             console.log('Error rejecting the invitation:', error);
//         }
//     }

      //food creator deletes the food record they add
      function* fetchDeleteFood(action){
          console.log('in fetchDeleteFood', action.payload.id);
        try {
            yield axios.delete(`/food/${action.payload.id}`);
            yield put({type: 'FETCH_EVENT_FOOD', payload: {id: action.payload.eventId}});
        } catch (error) {
            console.log('Error deleting the food:', error);
        }
    }

//     //grab the list of all events the user is attending 
//     function* fetchAttending(){
//         try{
//          const attending=yield axios.get('/event/attending');
//          yield put({ type: 'SET_ATTENDING', payload: attending.data});
//         } catch (error) {
//          console.log('Error getting users invites:', error);
//          }
//      }

//      //grab the list of all events the user is hosting
//      function* fetchHosting(){
//         try{
//          const hosting=yield axios.get('/event/hosting');
//          yield put({ type: 'SET_HOSTING', payload: hosting.data});
//         } catch (error) {
//          console.log('Error getting users invites:', error);
//          }
//      }

    //post the food to the food table and add food restriction details
    function* fetchAddFood(action){
        console.log('in fetchAddFood food saga');
        try{
            yield axios.post('/food', action.payload);
        //grab the list of all foods again
            yield put({type: 'FETCH_EVENT_FOOD', payload: {id: action.payload.eventId}});

        } catch (error){
            console.log('Error posting food:', error);
        }
    }

    function* fetchEventFood(action){
        console.log('in fetchEventFood food saga');
        try{
            const foods=yield axios.get(`/food/${action.payload.id}`);
            yield put ({type: 'SET_EVENT_FOOD', payload: foods.data})

        } catch (error){
            console.log('Error getting this events food:', error);
        }
    }


  function* eventSaga() {
   yield takeEvery ('FETCH_ADD_FOOD', fetchAddFood);
   yield takeEvery ('FETCH_EVENT_FOOD', fetchEventFood);
   yield takeEvery ('FETCH_DELETE_FOOD', fetchDeleteFood);
    //yield takelatest('FETCH_USER_RESTRICTION', userRestrictionFetch);
  }
  
  export default eventSaga;