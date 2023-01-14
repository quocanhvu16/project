import { configureStore } from "@reduxjs/toolkit";
import showForm from "./showForm";
import checkLogIn from "./checkLogin";
import setTab from "./tab";

const store = configureStore({
    reducer:{
        "showForm":showForm,
        "checkLogIn":checkLogIn,
        "setTab": setTab
    }
})

export default store;