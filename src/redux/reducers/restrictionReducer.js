
const restrictionReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_RESTRICTION':
        return action.payload;
      //case 'UNSET_USER':
        //return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default restrictionReducer;
