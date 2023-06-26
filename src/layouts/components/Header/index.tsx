import { Layout } from "antd";
import React from "react";

import AvatarIcon from "./components/AvatarIcon";
import CollapseIcon from "./components/CollapseIcon";
import BreadcrumbNav from "./components/BreadcrumbNav";
import "./index.scss";

export default function LayoutHeader() {
	const { Header } = Layout;
	return (
		<Header>
			<div className="header-lf">
				<CollapseIcon />
				<BreadcrumbNav />
			</div>
			<div className="header-ri">
				<span className="username">CaiCai</span>
				<AvatarIcon />
			</div>
		</Header>
	);
}
