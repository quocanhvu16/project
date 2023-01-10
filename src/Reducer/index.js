import { configureStore } from "@reduxjs/toolkit";
import showForm from "./showForm";

const store = configureStore({
    reducer:{
        "showForm":showForm
    }
})

export default store;