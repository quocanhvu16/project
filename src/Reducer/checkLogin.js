import { type } from "@testing-library/user-event/dist/type";

/* eslint-disable default-case */
const checkLogIn = (state=false,action)=> {
    switch(action.type){
        case "login":
            state=true;
            break
        case "logout":
            state=false;
            break
    }
    return state
}

export default checkLogIn;