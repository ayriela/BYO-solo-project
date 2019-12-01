
const restrictionReducer = (state = [], action) => {
    if(action.type==='SET_RESTRICTION') {
        return action.payload;
    } else if (action.type==='UPDATE_RESTRICTION'){
        //loop through current state and match the id that was just updated
        return state.map( i => {
            if (i.id===action.payload.id){
                //if it matches flip the active flag
                return {...i, active: !i.active};
            } else{
                return i;
            }
        }) 
    } else {
        return state;
    }
  };
  
  
  // user will be on the redux state at:
  // state.user
  export default restrictionReducer;
