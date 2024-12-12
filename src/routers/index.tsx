import { Navigate, useRoutes } from "react-router-dom";
// import type { RouteObject } from "react-router-dom";

import Login from "@/views/login/index";
// import LayoutIndex from "@/layouts/index";
// // import Home from "@/views/home";
// // import DataScreen from "@/views/dataScreen/index";
// // import UseHooks from "@/views/proTable/useHooks/index";

// // import UseComponent from "@/views/proTable/useComponent/index";
// // import DataVisualize from "@/views/dashboard/dataVisualize";

// // import NotFound from "@/components/ErrorMessage/404";

// import lazyLoad from "./lazyLoad";
// import React from "react";
// import { HOME_URL } from "@/config/config";
import { type RouteObject } from "@/routers/interface";

type MetaRouters = Record<string, RouteObject[]>;

// * 导入所有router
const metaRouters: MetaRouters = import.meta.glob("./modules/*.tsx", {
	eager: true
});

// * 处理路由
export const routerArray: RouteObject[] = [];

Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		// @ts-expect-error
		routerArray.push(...metaRouters[item][key]);
	});
});

export const defaultList = [
	{
		icon: "HomeOutlined",
		title: "首页",
		path: "/home/index"
	},
	{
		icon: "AreaChartOutlined",
		title: "数据大屏",
		path: "/dataScreen/index"
	},
	{
		icon: "TableOutlined",
		title: "超级表格",
		path: "/proTable",
		children: [
			{
				icon: "AppstoreOutlined",
				path: "/proTable/useHooks",
				title: "使用 Hooks"
			},
			{
				icon: "AppstoreOutlined",
				path: "/proTable/useComponent",
				title: "使用 Component"
			}
		]
	},
	{
		icon: "FundOutlined",
		title: "Dashboard",
		path: "/dashboard",
		children: [
			{
				icon: "AppstoreOutlined",
				path: "/dashboard/dataVisualize",
				title: "数据可视化"
			},
			{
				icon: "AppstoreOutlined",
				path: "/dashboard/embedded",
				title: "内嵌页面"
			}
		]
	},
	{
		icon: "FileTextOutlined",
		title: "表单 Form",
		path: "/form",
		children: [
			{
				icon: "AppstoreOutlined",
				path: "/form/basicForm",
				title: "基础 Form"
			},
			{
				icon: "AppstoreOutlined",
				path: "/form/validateForm",
				title: "校验 Form"
			},
			{
				icon: "AppstoreOutlined",
				path: "/form/dynamicForm",
				title: "动态 Form"
			}
		]
	},
	{
		icon: "PieChartOutlined",
		title: "Echarts",
		path: "/echarts",
		children: [
			{
				icon: "AppstoreOutlined",
				path: "/echarts/waterChart",
				title: "水型图"
			},
			{
				icon: "AppstoreOutlined",
				path: "/echarts/columnChart",
				title: "柱状图"
			},
			{
				icon: "AppstoreOutlined",
				path: "/echarts/lineChart",
				title: "折线图"
			},
			{
				icon: "AppstoreOutlined",
				path: "/echarts/pieChart",
				title: "饼图"
			},
			{
				icon: "AppstoreOutlined",
				path: "/echarts/radarChart",
				title: "雷达图"
			},
			{
				icon: "AppstoreOutlined",
				path: "/echarts/nestedChart",
				title: "嵌套环形图"
			}
		]
	},
	{
		icon: "ShoppingOutlined",
		title: "常用组件",
		path: "/assembly",
		children: [
			{
				icon: "AppstoreOutlined",
				path: "/assembly/guide",
				title: "引导页"
			},
			{
				icon: "AppstoreOutlined",
				path: "/assembly/svgIcon",
				title: "Svg 图标"
			},
			{
				icon: "AppstoreOutlined",
				path: "/assembly/selectIcon",
				title: "Icon 选择"
			},
			{
				icon: "AppstoreOutlined",
				path: "/assembly/batchImport",
				title: "批量导入数据"
			},
			{
				icon: "AppstoreOutlined",
				path: "/assembly/earth",
				title: "3D 地球"
			},
			{
				icon: "AppstoreOutlined",
				path: "/assembly/button",
				title: "Button 样式"
			}
		]
	},
	{
		icon: "ProfileOutlined",
		title: "CSS 案例",
		path: "/demo",
		children: [
			{
				icon: "AppstoreOutlined",
				path: "/demo/loading",
				title: "加载中"
			}
		]
	},
	{
		icon: "ProfileOutlined",
		title: "菜单嵌套",
		path: "/menu",
		children: [
			{
				icon: "AppstoreOutlined",
				path: "/menu/menu1",
				title: "菜单1"
			},
			{
				icon: "AppstoreOutlined",
				path: "/menu/menu2",
				title: "菜单2",
				children: [
					{
						icon: "AppstoreOutlined",
						path: "/menu/menu2/menu21",
						title: "菜单2-1"
					},
					{
						icon: "AppstoreOutlined",
						path: "/menu/menu2/menu22",
						title: "菜单2-2",
						children: [
							{
								icon: "AppstoreOutlined",
								path: "/menu/menu2/menu22/menu221",
								title: "菜单2-2-1"
							},
							{
								icon: "AppstoreOutlined",
								path: "/menu/menu2/menu22/menu222",
								title: "菜单2-2-2"
							}
						]
					},
					{
						icon: "AppstoreOutlined",
						path: "/menu/menu2/menu23",
						title: "菜单2-3"
					}
				]
			},
			{
				icon: "AppstoreOutlined",
				path: "/menu/menu3",
				title: "菜单3"
			}
		]
	},
	{
		icon: "ExclamationCircleOutlined",
		title: "错误页面",
		path: "/error",
		children: [
			{
				icon: "AppstoreOutlined",
				path: "/404",
				title: "404页面"
			},
			{
				icon: "AppstoreOutlined",
				path: "/403",
				title: "403页面"
			},
			{
				icon: "AppstoreOutlined",
				path: "/500",
				title: "500页面"
			}
		]
	},
	{
		icon: "PaperClipOutlined",
		title: "外部链接",
		path: "/link",
		children: [
			{
				icon: "AppstoreOutlined",
				path: "/link/github",
				title: "GitHub 仓库",
				isLink: "https://github.com"
			},
			{
				icon: "AppstoreOutlined",
				path: "/link/juejin",
				title: "掘金文档",
				isLink: "https://juejin.cn"
			},
			{
				icon: "AppstoreOutlined",
				path: "/link/myBlog",
				title: "个人博客",
				isLink: "https://masterjiyuhang.github.io/erhang-records/"
			}
		]
	}
];

export const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/login" />
	},
	{
		path: "/login",
		element: <Login />,
		meta: {
			requiresAuth: false,
			title: "登录页",
			key: "login"
		}
	},
	...routerArray,
	// {
	// 	element: <LayoutIndex />,
	// 	// element: lazyLoad(React.lazy(() => import("@/layouts/index"))),
	// 	children: [
	// 		{
	// 			path: HOME_URL,
	// 			element: lazyLoad(React.lazy(() => import("@/views/home/index")))
	// 		},
	// 		{
	// 			path: "/dataScreen/index",
	// 			element: lazyLoad(React.lazy(() => import("@/views/dataScreen/index")))
	// 		},
	// 		{
	// 			path: "/proTable/useHooks",
	// 			element: lazyLoad(React.lazy(() => import("@/views/proTable/useHooks/index")))
	// 		},
	// 		{
	// 			path: "/proTable/useComponent",
	// 			element: lazyLoad(React.lazy(() => import("@/views/proTable/useComponent/index")))
	// 		},
	// 		{
	// 			path: "/dashboard/dataVisualize",
	// 			element: lazyLoad(React.lazy(() => import("@/views/dashboard/dataVisualize/index")))
	// 		}
	// 	]
	// },
	// {
	// 	path: "/404",
	// 	element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/404")))
	// },
	// {
	// 	path: "/403",
	// 	element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/403")))
	// },
	// {
	// 	path: "/500",
	// 	element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/500")))
	// },
	{
		path: "*",
		element: <Navigate to={"/404"} />
	}
];

const Router = () => {
	const routes = useRoutes(rootRouter as any);
	return routes;
};
// const Router = rootRouter;

export default Router;
