import { Layout } from "antd";
import React from "react";

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
	return (
		<Header>
			<div className="header-lf">
				<CollapseIcon />
				<BreadcrumbNav />
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
