const detailCountReducer = (state = '', action) => {
    if(action.type==='SET_DETAIL_COUNT') {
        return action.payload;
    } else {
        return state;
    }
  };
  
  
  // user will be on the redux state at:
  // state.user
  export default detailCountReducer;