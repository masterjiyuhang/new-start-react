import Router from "@/routers/index";
import { HashRouter } from "react-router-dom";
import RouterGuard from "@/routers/routerGuard";

const App = () => {
	return (
		<HashRouter>
			{/* <Router /> */}
			{/* 添加路由守卫 */}
			<RouterGuard routes={Router} />
		</HashRouter>
	);
};

export default App;
