import useIntroJs from "@/hooks/useIntro";
import { Button } from "antd";
import React from "react";

const guide = () => {
	const { intro } = useIntroJs();
	console.log(intro);

	console.log(document.querySelector("#step1"));

	intro.setOptions({
		steps: [
			{
				element: document.querySelector("#step1") as HTMLElement, // 定位到相应的元素位置，如果不设置element，则默认展示在屏幕中央
				title: "Welcome", // 标题
				intro: "Hello World! 👋" // 内容
			}
		]
	});

	return (
		<div>
			<div id="step1" className="ls">
				guide 引导页
			</div>
			<div data-title="Welcome!" data-intro="Hello World!">
				hello!
			</div>
			<Button onClick={() => intro.start()}>kaishi</Button>
		</div>
	);
};

export default guide;
