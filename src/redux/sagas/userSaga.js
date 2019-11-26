import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
    console.log('in fetchUser', response.data.id);
    yield put({type: 'FETCH_RESTRICTION', payload:{id: response.data.id}})
  } catch (error) {
    console.log('User get request failed', error);
  }
}

//fired on FETCH_PROFILE_UPDATE
function* fetchProfileUpdate(action) {
  try {
    //set up values to update user and user_restriction table
    const values = {
      username: action.payload.username,
      email: action.payload.email,
      restriction: action.payload.restriction
    };
    console.log('in fetchProfileUpdate', action.payload.id);
   
    yield axios.put(`/profile/${action.payload.id}`, values);
    yield put({type: 'FETCH_USER'})
  } catch (error) {
    console.log('User profile update failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('FETCH_PROFILE_UPDATE', fetchProfileUpdate);
}

export default userSaga;
