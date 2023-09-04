import ReactDOM from "react-dom/client";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persister } from "@/redux-toolkit";

import App from "@/App";
import "antd/dist/reset.css";
import "@/styles/reset.scss";
import "@/styles/common.scss";

import "@/language/index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<PersistGate persistor={persister}>
			<App />
		</PersistGate>
	</Provider>
);
