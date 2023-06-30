import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import lazyLoad from "../util/lazyLoad";
import React from "react";

const dashboardRouter: Array<RouteObject> = [
	{
		path: "/dashboard",
		element: <LayoutIndex />,
		meta: { title: "Dashboard" },
		children: [
			{
				path: "/dashboard/dataVisualize",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/dataVisualize"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "数据可视化",
					key: "dataVisualize"
				}
			},
			{
				path: "/dashboard/embedded",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/embedded"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "内嵌页面",
					key: "embedded"
				}
			}
		]
	}
];

export default dashboardRouter;
