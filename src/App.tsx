import Router from "@/routers/index";
import { ConfigProvider } from "antd";
import { connect } from "react-redux";
import { HashRouter } from "react-router-dom";
// import RouterGuard from "@/routers/routerGuard";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";
import { useEffect, useState } from "react";
import { getBrowserLang } from "@/utils/util";
import AuthRouter from "@/routers/utils/authRouter";
import useTheme from "@/hooks/useTheme";
import i18n from "i18next";
import { setLanguage } from "@/redux/modules/global/action";

const App = (props: any) => {
	const [i18nLocale, setI18nLocale] = useState(zhCN);

	const { language, assemblySize, themeConfig, setLanguage } = props;

	useTheme(themeConfig);

	const setAntdLanguage = () => {
		// 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
		if (props.language && props.language == "zh") return setI18nLocale(zhCN);
		if (props.language && props.language == "en") return setI18nLocale(enUS);
		if (getBrowserLang() == "zh") return setI18nLocale(zhCN);
		if (getBrowserLang() == "en") return setI18nLocale(enUS);
	};
	useEffect(() => {
		console.log(props.language, "语言发生变化了");
		// 全局使用国际化
		i18n.changeLanguage(language || getBrowserLang());
		setLanguage(language || getBrowserLang());
		setAntdLanguage();
	}, [language]);
	return (
		<HashRouter>
			<ConfigProvider locale={i18nLocale} componentSize={assemblySize}>
				<AuthRouter>
					<Router />
				</AuthRouter>
			</ConfigProvider>
			{/* 添加路由守卫 */}
			{/* <RouterGuard routes={Router} /> */}
		</HashRouter>
	);
};

const mapStateToProps = (state: any) => state.globalReducer;
const mapDispatchToProps = { setLanguage };
export default connect(mapStateToProps, mapDispatchToProps)(App);
