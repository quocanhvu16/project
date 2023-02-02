import { type } from "@testing-library/user-event/dist/type";

/* eslint-disable default-case */
const showForm = (state=false,action)=> {
    if(action.payload){
        switch(action.type){
            case "setShowForm":
                return action.payload;
        }
    }   
    else{
        switch(action.type){
            case "setShowForm":
                return !state;
        }
    }
    return state
}

export default showForm;