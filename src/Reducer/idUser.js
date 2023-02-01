import { type } from "@testing-library/user-event/dist/type";

/* eslint-disable default-case */
const idUser = (state=[],action)=> {
    switch(action.type){
        case "getIdUser":
            state=action.payload; 
            break
    }
    return state;
}

export default idUser;