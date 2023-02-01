const isValidSdt = (sdt) => {
    if(sdt.length>11 || sdt.length <10){
        return 2; //SĐT chi chua 10 hoac 11 ky tu
    }
    let pattern = /\d/
    if(!pattern.test(sdt)){
        return 1 //"SĐT chỉ được chứa chữ số"
    }
    return 0 //"Không có lỗi"
}

const isValidUser = (user)=>{
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    if (!filter.test(user)) { 
        return 1; 
}
    return 0
}
const isValidPass = (user)=>{
    return 0
}


export {isValidSdt,isValidUser,isValidPass}