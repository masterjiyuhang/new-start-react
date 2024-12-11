// import React from "react";
import ReactDOM from "react-dom/client";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux";

import App from "@/App";
import "antd/dist/reset.css";
import "@/styles/reset.scss";
import "@/styles/common.scss";
import "@/styles/tailwind.css";

import "@/language/index";

ReactDOM.createRoot(document.getElementById("root")!).render(
	// * react 严格模式
	// <React.StrictMode>
	// * react-redux写法
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
	// </React.StrictMode>
);
