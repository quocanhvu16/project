/* eslint-disable default-case */
const bill = (state=[],action)=> {
    switch(action.type){
        case "initBill":
            state=action.payload
            break
        case "addBill":
            state=[...state,action.payload];   
            break
    }
    return state;
}

export default bill;