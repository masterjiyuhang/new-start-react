import { observer } from "mobx-react-lite";
import "./loading.scss";

const Loading = () => {
	const LoaderThree = () => {
		const SSRsss = Array.from({ length: 6 }).map((item, index) => {
			return (
				<div className="w-1 h-2 loader_three" key={index}>
					<div className="bg-red-400 loader_three_dot"></div>
				</div>
			);
		});

		return SSRsss;
	};
	// const Sp1 = () => <h1>sp1</h1>;

	const LoadingFour = () => {
		return <div role="alert" aria-live="assertive" className="loader_four"></div>;
	};

	return (
		<div className="card content-box">
			<span className="text">Loading 🍉🍓🍉</span>

			<div className="p-3 loading-demo1">
				<section className="dots-container">
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
				</section>
			</div>

			<div className="loader2">
				<div className="blue"></div>
			</div>

			{/* <Sp1 /> */}

			<div className="relative w-40 h-40">
				<LoaderThree />
			</div>

			<LoadingFour />

			<div
				style={{
					boxShadow: "0px -5px 20px 0px rgb(186, 66, 255), 0px 5px 20px 0px rgb(0, 225, 255)"
				}}
				className={"size-20 bg-gradient-to-r from-[#acb6e5] to-[#86fde8] blur-[1px] animate-spin rounded-[40px]"}
			>
				<div className="bg-black rounded-full size-20 blur-sm"></div>
			</div>
		</div>
	);
};

export default observer(Loading);
