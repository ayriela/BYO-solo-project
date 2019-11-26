const allRestrictionReducer = (state = [], action) => {
    if(action.type==='SET_RESTRICTION_DETAIL') {
        return action.payload;
    } else {
        return state;
    }
  };
  
  
  // user will be on the redux state at:
  // state.user
  export default allRestrictionReducer;