import { useEffect } from "react";
import { RouteObject } from "@/routers/interface";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import guard from "@/routers/util/guard";

const RouterGuard = ({ routes }: { routes: RouteObject[] }) => {
	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		// * 当以下三个参数改变时就执行 路由拦截 方法
		guard(location, navigate, routes);
	}, [location, navigate, routes]);

	const Router = useRoutes(routes as any);

	return Router;
};

export default RouterGuard;
