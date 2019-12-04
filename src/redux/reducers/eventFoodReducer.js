const eventFoodReducer = (state = [], action) => {
    if(action.type==='SET_EVENT_FOOD') {
        return action.payload;
    } else {
        return state;
    }
  };
  
  
  // user will be on the redux state at:
  // state.user
  export default eventFoodReducer;