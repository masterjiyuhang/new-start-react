import React from "react";
import "./hover-button.scss";

const HoverButton = () => {
	return (
		<div>
			<h1>
				Simple hover effects with <code>box-shadow</code>
			</h1>
			<button className={"fill"}>Fill In</button>
			<button className={"pulse"}>Pulse</button>
			<button className={"close"}>Close</button>
			<button className={"raise"}>Raise</button>
			<button className={"up"}>Fill Up</button>
			<button className={"slide"}>Slide</button>
			<button className={"offset"}>Offset</button>
		</div>
	);
};

export default HoverButton;
