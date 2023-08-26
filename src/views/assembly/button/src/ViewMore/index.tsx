import React from "react";
import styles from "./more.module.scss";

const ViewMore = () => {
	return (
		<div className={styles.container}>
			<h1>
				Simple View More<code>Button</code>
			</h1>
			<button className={styles["view-more-btn"]}>
				<span>View More</span>
				<span>View More</span>
			</button>
		</div>
	);
};

export default ViewMore;
