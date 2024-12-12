import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { type RouteObject } from "@/routers/interface";

// 表单 Form 模块
const formRouter: RouteObject[] = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "表单 Form"
		},
		path: "/form",
		children: [
			{
				path: "/form/basicForm",
				element: lazyLoad(React.lazy(async () => await import("@/views/form/basicForm/index"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "基础 Form",
					key: "basicForm"
				}
			},
			{
				path: "/form/validateForm",
				element: lazyLoad(React.lazy(async () => await import("@/views/form/validateForm/index"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "校验 Form",
					key: "validateForm"
				}
			},
			{
				path: "/form/dynamicForm",
				element: lazyLoad(React.lazy(async () => await import("@/views/form/dynamicForm/index"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "动态 Form",
					key: "dynamicForm"
				}
			}
		]
	}
];

export default formRouter;
