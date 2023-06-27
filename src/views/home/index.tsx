import React from "react";
import welcome from "@/assets/images/welcome.png";
import "./index.scss";

export default function Home() {
	return (
		<div className="home-container">
			<img src={welcome} alt="" />
		</div>
	);
}
