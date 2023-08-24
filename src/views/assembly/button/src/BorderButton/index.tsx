import React from "react";
import "./index.scss";

const BorderButton = () => {
	return (
		<div className="container">
			{[1, 2, 3, 4].map(item => {
				return (
					<button key={item} className={`button effect${item}`}>
						{item}
					</button>
				);
			})}
		</div>
	);
};

export default BorderButton;
