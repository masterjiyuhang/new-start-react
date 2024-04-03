import React from "react";
import { type RouteObject } from "@/routers/interface";
import lazyLoad from "@/routers/utils/lazyLoad";

const errorRouter: RouteObject[] = [
	{
		path: "/403",
		element: lazyLoad(React.lazy(async () => await import("@/components/ErrorMessage/403"))),
		meta: {
			keepAlive: true,
			requiresAuth: true,
			title: "403页面",
			key: "403"
		}
	},
	{
		path: "/404",
		element: lazyLoad(React.lazy(async () => await import("@/components/ErrorMessage/404"))),
		meta: {
			keepAlive: true,
			requiresAuth: false,
			title: "404页面",
			key: "404"
		}
	},
	{
		path: "/500",
		element: lazyLoad(React.lazy(async () => await import("@/components/ErrorMessage/500"))),
		meta: {
			requiresAuth: false,
			title: "500页面",
			key: "500"
		}
	}
];

export default errorRouter;
