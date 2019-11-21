
const eventInviteReducer = (state = [], action) => {
    if(action.type==='SET_INVITES') {
        return action.payload;
    } else {
        return state;
    }
  };
  
  
  // user will be on the redux state at:
  // state.user
  export default eventInviteReducer;
