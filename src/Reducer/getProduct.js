import { type } from "@testing-library/user-event/dist/type";

/* eslint-disable default-case */
const getProduct = (state={},action)=> {
    switch(action.type){
        case "get":
            state=action.payload;
    }
    return state
}

export default getProduct;