import storage from "redux-persist/lib/storage";
import reduxPromise from "redux-promise";
import reduxThunk from "redux-thunk";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import { useDispatch as useReduxDispatch, TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";

import global from "./reducer/global";
import tabs from "./reducer/tabs";
import auth from "./reducer/auth";
import menu from "./reducer/menu";
import breadcrumb from "./reducer/breadcrumb";

const middleWares = [reduxThunk, reduxPromise];
export const store = configureStore({
	reducer: persistReducer(
		{
			key: "redux-toolkit",
			storage: storage
		},
		combineReducers({
			global,
			tabs,
			auth,
			menu,
			breadcrumb
		})
	),
	middleware: middleWares,
	devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persister = persistStore(store);

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
