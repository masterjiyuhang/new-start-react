import React from "react";
import "./index.scss";

const Embedded = () => {
	return (
		<div className="content-box">
			<iframe src="https://react.docschina.org/" frameBorder="0" className="full-iframe"></iframe>
		</div>
	);
	// return <iframe src="https://react.docschina.org/" frameBorder="0" className="full-iframe"></iframe>;
};

export default Embedded;
