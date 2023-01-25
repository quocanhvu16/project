/* eslint-disable default-case */
const library = (state=[],action)=> {
    switch(action.type){
        case "initLibrary":
            state=action.payload
            break
        case "addLibrary":
            state=[...state,action.payload];   
            break
    }
    return state;
}

export default library;