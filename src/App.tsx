import Router from "@/routers/index";
import { ConfigProvider } from "antd";
import { HashRouter } from "react-router-dom";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";
import { useEffect, useState } from "react";
import { getBrowserLang } from "@/utils/util";
import AuthRouter from "@/routers/utils/authRouter";
import useTheme from "@/hooks/useTheme";
import i18n from "i18next";
import { RootState, useDispatch, useSelector } from "./redux-toolkit";
import { setLanguage } from "./redux-toolkit/reducer/global";

const App = () => {
	const dispatch = useDispatch();
	const [i18nLocale, setI18nLocale] = useState(zhCN);

	const { language, assemblySize } = useSelector((state: RootState) => state.global);

	useTheme();

	const setAntdLanguage = () => {
		// 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
		if (language && language == "zh") return setI18nLocale(zhCN);
		if (language && language == "en") return setI18nLocale(enUS);
		if (getBrowserLang() == "zh") return setI18nLocale(zhCN);
		if (getBrowserLang() == "en") return setI18nLocale(enUS);
	};
	useEffect(() => {
		console.log(language, "语言发生变化了");
		// 全局使用国际化
		i18n.changeLanguage(language || getBrowserLang());
		dispatch(setLanguage(language || getBrowserLang()));
		setAntdLanguage();
	}, [language]);
	return (
		<HashRouter>
			<ConfigProvider locale={i18nLocale} componentSize={assemblySize}>
				<AuthRouter>
					<Router />
				</AuthRouter>
			</ConfigProvider>
		</HashRouter>
	);
};

export default App;
