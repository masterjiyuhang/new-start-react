import Router from "@/routers/index";
import { ConfigProvider } from "antd";
import { connect } from "react-redux";
import { HashRouter } from "react-router-dom";
// import RouterGuard from "@/routers/routerGuard";
import zhCN from "antd/lib/locale/zh_CN";

const App = (props: any) => {
	return (
		<HashRouter>
			<ConfigProvider locale={zhCN} componentSize={props.assemblySize}>
				<Router />
			</ConfigProvider>
			{/* 添加路由守卫 */}
			{/* <RouterGuard routes={Router} /> */}
		</HashRouter>
	);
};

const mapStateToProps = (state: any) => state.globalReducer;
export default connect(mapStateToProps)(App);
