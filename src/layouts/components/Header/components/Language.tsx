import { TranslationOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import React from "react";

const Language = () => {
	const items: MenuProps["items"] = [
		{
			key: "zh-CN",
			label: <span>简体中文</span>
		},
		{
			key: "en",
			label: <span>英文</span>
		}
	];

	return (
		<Dropdown menu={{ items }}>
			<TranslationOutlined className="icon-style" />
		</Dropdown>
	);
};

export default Language;
