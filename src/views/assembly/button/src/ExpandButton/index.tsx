import React from "react";
import styles from "./expand.module.scss";

const ExpandButton = () => {
	return (
		<div className={styles.container}>
			<button className={styles["basic-button"]}>
				<span className={styles.circle}>
					<span className={`${styles.icon}`}></span>
					{/* <span className={`iconfont icon-follow ${styles.icon}`}></span> */}
				</span>

				<span className={styles.text}>Expand Button</span>
			</button>
		</div>
	);
};

export default ExpandButton;
