import { legacy_createStore as createStore, combineReducers, Store, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { applyMiddleware } from "redux"; // 应用中间件方法
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";

import menu from "./modules/menu/reducer";
import countReducer from "./modules/count/reducer";
import tabsReducer from "@/redux/modules/tabs/reducer";
import authReducer from "@/redux/modules/auth/reducer";
import globalReducer from "./modules/global/reducer";
import breadcrumbReducer from "./modules/breadcrumb/reducer";

// 创建reducer(拆分reducer)
const reducer = combineReducers({
	menu,
	countReducer,
	tabsReducer,
	authReducer,
	globalReducer,
	breadcrumbReducer
});

// redux 持久化配置
const persistConfig = {
	key: "redux-state",
	storage: storage,
	blacklist: ["countReducer", "tabsReducer"]
};
const persistReducerConfig = persistReducer(persistConfig, reducer);

// 开启 redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 使用 redux 中间件
const middleWares = applyMiddleware(reduxThunk, reduxPromise);

// 创建 store
const store: Store = createStore(persistReducerConfig, composeEnhancers(middleWares));

// 创建持久化 store
const persistor = persistStore(store);

export { store, persistor };
