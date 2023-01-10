import { type } from "@testing-library/user-event/dist/type";

/* eslint-disable default-case */
const showForm = (state=false,action)=> {
    switch(action.type){
        case "setShowForm":
            return !state;
    }
    return state
}

export default showForm;