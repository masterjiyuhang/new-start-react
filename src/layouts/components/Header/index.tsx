import { Layout } from "antd";
import React, { useEffect, useState } from "react";

import AvatarIcon from "./components/AvatarIcon";
import CollapseIcon from "./components/CollapseIcon";
import BreadcrumbNav from "./components/BreadcrumbNav";

import "./index.scss";
import AssemblySize from "./components/AssemblySize";
import Language from "./components/Language";
import Theme from "./components/Theme";
import FullScreen from "./components/FullScreen";

export default function LayoutHeader() {
	const { Header } = Layout;
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return (
		<Header>
			<div className="header-lf">
				<CollapseIcon />
				{windowWidth >= 420 && <BreadcrumbNav />}
			</div>
			<div className="header-ri">
				<AssemblySize />
				<Language />
				<Theme />
				<FullScreen />
				<span className="username">CaiCai</span>
				<AvatarIcon />
			</div>
		</Header>
	);
}
