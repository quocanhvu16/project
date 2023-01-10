const isValidName = (name) => {
    let pattern = /\d/
    if(pattern.test(name)){
        return 1 //"Ten khong duoc chua chu so"
    }
    return 0 //""
}

const isValidUser = (user)=>{
    return 0
}
const isValidPass = (user)=>{
    return 0
}


export {isValidName,isValidUser,isValidPass}