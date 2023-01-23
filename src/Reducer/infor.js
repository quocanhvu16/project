import { type } from "@testing-library/user-event/dist/type";

/* eslint-disable default-case */
const setInfor = (state=[],action)=> {
    switch(action.type){
        case "setInfor":
            state=action.payload; 
            break
    }
    return state;
}

export default setInfor;