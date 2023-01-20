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
import setTab from "./tab";
import getProduct from "./getProduct";

const persistConfig = {
    key: 'root',
    storage
}


const reducer =combineReducers({
    "showForm":showForm,
    "checkLogIn":checkLogIn,
    "setTab": setTab,
    "getProduct": getProduct
})

const persistedReducer = persistReducer(persistConfig, reducer);

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