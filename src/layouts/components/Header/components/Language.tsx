import i18n from "@/language";
import { setLanguage } from "@/redux/modules/global/action";
import { getBrowserLang } from "@/utils/util";
import { TranslationOutlined } from "@ant-design/icons";
import { Dropdown, type MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const Language = (props: any) => {
	const [language, setLanguage] = useState(props.language);
	useEffect(() => {
		setLanguage(props.language || getBrowserLang());
		i18n.changeLanguage(props.language || getBrowserLang());
	}, [props.language]);

	const changeLanguage: MenuProps["onClick"] = e => {
		props.setLanguage(e.key);
	};

	const items: MenuProps["items"] = [
		{
			key: "zh",
			disabled: language === "zh",
			label: <span>简体中文</span>
		},
		{
			key: "en",
			disabled: language === "en",
			label: <span>英文</span>
		}
	];

	return (
		<Dropdown menu={{ items, onClick: changeLanguage }}>
			<TranslationOutlined className="icon-style" />
		</Dropdown>
	);
};

// export default Language;

const mapStateToProps = (state: any) => state.globalReducer;
const mapDispatchToProps = { setLanguage };
export default connect(mapStateToProps, mapDispatchToProps)(Language);
