import { type } from "@testing-library/user-event/dist/type";

/* eslint-disable default-case */
const idCart = (state=1,action)=> {
    switch(action.type){
        case "initCart":
            state=action.payload; 
            break
        case "addCart":
            state=state +1; 
            break
    }
    return state;
}

export default idCart;