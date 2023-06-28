import React from "react";
import welcome from "@/assets/images/welcome.png";
import "./index.scss";
// import { useLocation } from "react-router-dom";

export default function Home() {
	// const location = useLocation();
	// console.log(location, "location");
	return (
		<div className="home-container">
			<img src={welcome} alt="" />
		</div>
	);
}
