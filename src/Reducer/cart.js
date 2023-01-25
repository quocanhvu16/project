/* eslint-disable default-case */
const cart = (state=[],action)=> {
    switch(action.type){
        case "initProduct":
            state=action.payload
            break
        case "addProduct":
            state=[...state,action.payload];   
            break
        case "removeProduct":
            const newState = [...state]
            newState.splice(action.payload,1)
            state=newState   
            break
    }
    return state;
}

export default cart;