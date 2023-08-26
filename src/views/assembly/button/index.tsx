import React from "react";
import styles from "./index.module.scss";
import HoverButton from "./src/HoverButton";
import ExpandButton from "./src/ExpandButton";
import BorderButton from "./src/BorderButton";
import DrawButton from "./src/DrawButton";
import ViewMore from "./src/ViewMore";

const SelfButton = () => {
	return (
		<div className={styles.container}>
			<h1>
				Useful <code>Button</code>
			</h1>
			<div className={styles.innerBox}>
				<button className={styles["btn-1"]}>
					<div>
						<span>show more</span>
						<span>View More</span>
					</div>
				</button>

				<button type="button" className={styles.btn2}>
					View More
				</button>

				<button type="button" className={styles.btn3}>
					彩色的我
				</button>
				<button type="button" className={styles.btn4}>
					有边的我
				</button>
			</div>

			<div style={{ marginTop: "20px" }}>
				<HoverButton />
			</div>

			<ExpandButton />

			<BorderButton />

			<DrawButton />

			<ViewMore />
		</div>
	);
};

export default SelfButton;
