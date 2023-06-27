// import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "antd/dist/reset.css";
import "@/styles/reset.scss";
import "@/styles/common.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	// * react 严格模式
	// <React.StrictMode>
	<App />
	// </React.StrictMode>
);
