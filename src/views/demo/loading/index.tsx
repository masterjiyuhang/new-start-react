import { observer } from "mobx-react-lite";
import "./loading.scss";
const Loading = () => {
	return (
		<div className="card content-box">
			<span className="text">Loading 🍉🍓🍉</span>

			<section className="dots-container">
				<div className="dot"></div>
				<div className="dot"></div>
				<div className="dot"></div>
				<div className="dot"></div>
				<div className="dot"></div>
			</section>
		</div>
	);
};

export default observer(Loading);
