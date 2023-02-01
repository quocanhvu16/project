import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

import showForm from "./showForm";
import checkLogIn from "./checkLogin";
import getProduct from "./getProduct";
import authSlice from "./authSlice";
import cart from "./cart";
import setInfor from "./infor";
import RootReducer from "./rootReducer";
import bill from "./bill";
import library from "./library";
import coin from "./coin";
import user from "./user";
import idUser from "./idUser";
import idCart from "./idCart";

const persistConfig = {
    key: 'root',
    storage
}
export const appReducer =combineReducers({
    "showForm":showForm,
    "checkLogIn":checkLogIn,
    // "setTab": setTab,
    "getProduct": getProduct,
    "auth" : authSlice,
    "cart" : cart,
    "setInfor": setInfor,
    "bill": bill,
    "library":library,
    "coin":coin,
    "user":user,
    "idUser": idUser,
    "idCart": idCart,
})

const persistedReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export default store;