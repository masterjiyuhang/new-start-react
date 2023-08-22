import React from "react";
import styles from "./index.module.scss";

const SelfButton = () => {
	return (
		<div className={styles.container}>
			<button className={styles["btn-1"]}>
				<div>
					<span>show more</span>
					<span>View More</span>
				</div>
			</button>

			<button type="button" className={styles.btn2}>
				View More
			</button>
		</div>
	);
};

export default SelfButton;
