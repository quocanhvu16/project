/* eslint-disable default-case */
const coin = (state=0,action)=> {
    switch(action.type){
        case "initCoin":
            state=action.payload
            break
        case "addCoin":
            state= state + action.payload   
            break
        case "payCoin":
            state= state - action.payload   
            break
    }
    return state;
}

export default coin;