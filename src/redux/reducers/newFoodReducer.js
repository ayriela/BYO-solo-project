
const starting={
    name: '',
    ingredients: '',
    restriction:[],
};

const newFoodReducer = (state = starting, action) => {
    //update to food name
    if(action.type==='SET_NEW_FOOD_NAME') {
        return {
            ...state,
            name: action.payload.value,
        }
    } else if (action.type==='SET_NEW_FOOD_INGREDIENT'){
        //update to food ingredients field
        return {
            ...state,
            ingredients: action.payload.value,
        }
    } else if (action.type==='SET_NEW_RESTRICTION'){
        //console.log('in set_new_restriction', action.payload.id);
        //first check if the values exists

        ///figure out filter formatting
        if (state.restriction.filter(item=>item.id===action.payload.id).length!==0){
            return {...state,
                    restriction: state.restriction.map( i => {
                        if (i.id===action.payload.id){
                    //if it matches flip the active flag
                        return {...i, bool: action.payload.bool};
                    } else{
                        return i;
                }
            }) 
        }
        } else{
            return{
                ...state,
                restriction: [...state.restriction, action.payload]
            }
        }
        // updating array of restrciction values {restriction_id: TRUE} or {restriction_id: FALSE} 
        //(true if user selects the item contains item or not sure and false if allergen is not present/user selects no)
        
    } else if(action.type==='CLEAR_NEW_FOOD'){
        return starting;
    } else {
        return state;
    }
  };
  
  
  // user will be on the redux state at:
  // state.user
  export default newFoodReducer;