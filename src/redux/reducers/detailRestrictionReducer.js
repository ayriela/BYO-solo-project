const detailRestrictionReducer = (state = [], action) => {
    if(action.type==='SET_DETAIL_RESTRICTION') {
        return action.payload;
    } else {
        return state;
    }
  };
  
  
  // user will be on the redux state at:
  // state.user
  export default detailRestrictionReducer;