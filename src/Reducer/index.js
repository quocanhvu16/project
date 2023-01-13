import { configureStore } from "@reduxjs/toolkit";
import showForm from "./showForm";
import checkLogIn from "./checkLogin";

const store = configureStore({
    reducer:{
        "showForm":showForm,
        "checkLogIn":checkLogIn
    }
})

export default store;