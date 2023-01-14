import { type } from "@testing-library/user-event/dist/type";

/* eslint-disable default-case */
const setTab = (state='trangchu',action)=> {
    switch(action.type){
        case "tabsachgiay":
            state = "sachgiay"
            break;
        case "tabsachdientu":
            state = "sachdientu"
            break  ;  
        case "tabaudiobook":
            state = "audiobook"
            break;
        case "tabvideobook":
            state = "videobook"
            break;
        case "tabthuvien":
            state = "thuvien"
            break;
        case "tabtrangchu":
            state = "trangchu"
            break;
    }
    return state
}

export default setTab;