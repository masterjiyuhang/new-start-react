import { RootState, useDispatch, useSelector } from "@/redux-toolkit";
import { setLanguage } from "@/redux-toolkit/reducer/global";
import { TranslationOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import i18n from "@/language";
import { getBrowserLang } from "@/utils/util";
// import React, { useEffect, useState } from "react";
// import { setLanguage } from "@/redux/modules/global/action";
// import { connect } from "react-redux";

const Language = () => {
	const { language } = useSelector((state: RootState) => state.global);

	const dispatch = useDispatch();
	// const [language, setLanguage] = useState(props.language);

	// useEffect(() => {
	// 	setLanguage(props.language || getBrowserLang());
	// 	i18n.changeLanguage(props.language || getBrowserLang());
	// }, [props.language]);

	const changeLanguage: MenuProps["onClick"] = e => {
		dispatch(setLanguage(e.key));
		i18n.changeLanguage(language || getBrowserLang());
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

// const mapStateToProps = (state: any) => state.globalReducer;
// const mapDispatchToProps = { setLanguage };
// export default connect(mapStateToProps, mapDispatchToProps)(Language);

export default Language;
