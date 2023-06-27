import { Navigate, RouteObject, useRoutes } from "react-router-dom";

import Login from "@/views/login/index";
import LayoutIndex from "@/layouts/index";
// import Home from "@/views/home";
// import DataScreen from "@/views/dataScreen/index";
// import UseHooks from "@/views/proTable/useHooks/index";

// import UseComponent from "@/views/proTable/useComponent/index";
// import DataVisualize from "@/views/dashboard/dataVisualize";

// import NotFound from "@/components/ErrorMessage/404";

import lazyLoad from "./lazyLoad";
import React from "react";
import { HOME_URL } from "@/config/config";

const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/login" />
	},
	{
		path: "/login",
		element: <Login />
		// element: lazyLoad(React.lazy(() => import("@/views/login/index")))
	},
	{
		element: <LayoutIndex />,
		// element: lazyLoad(React.lazy(() => import("@/layouts/index"))),
		children: [
			{
				path: HOME_URL,
				element: lazyLoad(React.lazy(() => import("@/views/home/index")))
			},
			{
				path: "/dataScreen/index",
				element: lazyLoad(React.lazy(() => import("@/views/dataScreen/index")))
			},
			{
				path: "/proTable/useHooks",
				element: lazyLoad(React.lazy(() => import("@/views/proTable/useHooks/index")))
			},
			{
				path: "/proTable/useComponent",
				element: lazyLoad(React.lazy(() => import("@/views/proTable/useComponent/index")))
			},
			{
				path: "/dashboard/dataVisualize",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/dataVisualize/index")))
			}
		]
	},
	{
		path: "/404",
		element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/404")))
	},
	{
		path: "/403",
		element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/403")))
	},
	{
		path: "/500",
		element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/500")))
	},
	{
		path: "*",
		element: <Navigate to={"/404"} />
	}
];

const Router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};

export default Router;
