import useIntroJs from "@/hooks/useIntro";
import { Button } from "antd";
import "./index.scss";

const guide = () => {
	const { intro } = useIntroJs();
	console.log(intro);

	const startIntro = () => {
		console.log(document.querySelector("#step1"));
		intro.setOptions({
			steps: [
				{
					element: document.querySelector("#step1")!, // 定位到相应的元素位置，如果不设置element，则默认展示在屏幕中央
					title: "Welcome", // 标题
					intro: "Hello World! 👋" // 内容
				},
				{
					element: document.querySelector("#step2")!, // 定位到相应的元素位置，如果不设置element，则默认展示在屏幕中央
					title: "Welcome", // 标题
					intro: "Hello World! 👋" // 内容
				}
			]
		});

		intro.start();
	};

	return (
		<div className="card content-box">
			<div id="step1" className="text">
				guide 引导页
			</div>
			<div id="step2" className="text">
				hello setup2 !{" "}
			</div>
			<Button onClick={startIntro} className="intro-btn" type="primary">
				{" "}
				开始指引{" "}
			</Button>
		</div>
	);
};

export default guide;
