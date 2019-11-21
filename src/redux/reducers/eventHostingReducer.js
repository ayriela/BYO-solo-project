const eventHostingReducer = (state = [], action) => {
    if(action.type==='SET_HOSTING') {
        return action.payload;
    } else {
        return state;
    }
  };
  
  
  // user will be on the redux state at:
  // state.user
  export default eventHostingReducer;