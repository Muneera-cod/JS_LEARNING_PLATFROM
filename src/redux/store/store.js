import { configureStore,combineReducers } from "@reduxjs/toolkit";
import themeReducer from '../reducers/Theme/ThemeSlice';
import viewReducer from '../reducers/View/ViewSlice'
// import authReducer from '../reducers/auth/AuthSlice';
import { persistStore,persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import { questionApi } from '../Api/QuestionApiSlice';
import { authApi } from "../Api/authApiSlice";
import { learnerApi } from "../Api/LearnerApiSlice";
import { userProgressApi } from "../Api/UserProgressApiSlice";
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["view","theme"],
}
const rootReducer = combineReducers({
    theme:themeReducer,
    view:viewReducer,
    // auth:authReducer,
    [questionApi.reducerPath]: questionApi.reducer, 
    [authApi.reducerPath]: authApi.reducer,
    [learnerApi.reducerPath]: learnerApi.reducer,
    [userProgressApi.reducerPath]: userProgressApi.reducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store=configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
        serializableCheck: false,
      }).concat(questionApi.middleware,authApi.middleware,learnerApi.middleware,userProgressApi.middleware),
})
export const persistor = persistStore(store);