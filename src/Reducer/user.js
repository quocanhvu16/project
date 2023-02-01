import { type } from "@testing-library/user-event/dist/type";

/* eslint-disable default-case */
const user = (state=[],action)=> {
    switch(action.type){
        case "getUser":
            state=action.payload; 
            break
    }
    return state;
}

export default user;