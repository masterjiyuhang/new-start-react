import React from "react";
import styles from "./draw.module.scss";

const DrawButton = () => {
	return (
		<div className={styles.container}>
			<button className={`${styles.drawBtn} ${styles.drawBorder}`}>Draw Button</button>
		</div>
	);
};

export default DrawButton;
