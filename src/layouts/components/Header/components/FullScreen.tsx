import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import screenfull from "screenfull";

const FullScreen = () => {
	const [fullScreen, setFullScreen] = useState(false);

	useEffect(() => {
		screenfull.on("change", () => {
			if (screenfull.isFullscreen) setFullScreen(true);
			else setFullScreen(false);
			return () => {
				screenfull.off("change", () => {});
			};
		});
	}, []);

	const handleFullScreen = () => {
		if (!screenfull.isEnabled) message.warning("当前您的浏览器不支持全屏 ❌");
		screenfull.toggle();
	};
	return (
		<>
			{fullScreen ? (
				<FullscreenExitOutlined className="icon-style" onClick={handleFullScreen} />
			) : (
				<FullscreenOutlined className="icon-style" onClick={handleFullScreen} />
			)}
		</>
	);
};

export default FullScreen;
