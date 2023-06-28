import { HOME_URL } from "@/config/config";
import { addTabs } from "@/redux/modules/tabs/action";
import { routerArray } from "@/routers";
import { searchRoute } from "@/utils/util";
import { HomeFilled } from "@ant-design/icons";
import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const LayoutTabs = (props: any) => {
	const { TabPane } = Tabs;
	const { pathname } = useLocation();
	const [activeValue, setActiveValue] = useState<string>(pathname);
	// const [tabsList] = useState([
	// 	{
	// 		title: "首页",
	// 		path: HOME_URL
	// 	},
	// 	{
	// 		title: "数据大屏",
	// 		path: "/dataScreen/index"
	// 	},
	// 	{
	// 		title: "使用 Hooks",
	// 		path: "/proTable/useHooks"
	// 	},
	// 	{
	// 		title: "使用 Component",
	// 		path: "/proTable/useComponent"
	// 	},
	// 	{
	// 		title: "数据可视化",
	// 		path: "/dashboard/dataVisualize"
	// 	},
	// 	{
	// 		title: "内嵌页面",
	// 		path: "/dashboard/embedded"
	// 	}
	// 	// {
	// 	// 	title: "内嵌页面",
	// 	// 	path: "/embedded"
	// 	// },
	// 	// {
	// 	// 	title: "基础 Form",
	// 	// 	path: "/basicForm"
	// 	// },
	// 	// {
	// 	// 	title: "校验 Form",
	// 	// 	path: "/validateForm"
	// 	// },
	// 	// {
	// 	// 	title: "动态 Form",
	// 	// 	path: "/dynamicForm"
	// 	// },
	// 	// {
	// 	// 	title: "水型图",
	// 	// 	path: "/waterChart"
	// 	// },
	// 	// {
	// 	// 	title: "柱状图",
	// 	// 	path: "/columnChart"
	// 	// },
	// 	// {
	// 	// 	title: "折线图",
	// 	// 	path: "/超级表格"
	// 	// },
	// 	// {
	// 	// 	title: "雷达图",
	// 	// 	path: "/radarChart"
	// 	// },
	// 	// {
	// 	// 	title: "嵌套环形图",
	// 	// 	path: "/nestedChart"
	// 	// }
	// ]);

	const { addTabs, tabsList } = props;

	useEffect(() => {
		const route = searchRoute(pathname, routerArray);
		addTabs({ title: route?.meta?.title, path: route?.path });
		setActiveValue(pathname);
	}, [pathname]);

	const navigate = useNavigate();

	const tabsClick = (path: string) => {
		navigate(path);
	};

	const delTabs = (path: string) => {
		console.log(path);
	};

	return (
		<Tabs
			activeKey={activeValue}
			onChange={tabsClick}
			hideAdd
			type="editable-card"
			onEdit={path => {
				delTabs(path as string);
			}}
		>
			{tabsList.map((item: Menu.MenuOptions) => {
				return (
					<TabPane
						key={item.path}
						tab={
							<span>
								{item.path == HOME_URL ? <HomeFilled /> : ""}
								{item.title}
							</span>
						}
						closable={item.path !== HOME_URL}
					></TabPane>
				);
			})}
		</Tabs>
	);
};

const mapStateToProps = (state: any) => state.tabsReducer;
const mapDispatchToProps = { addTabs };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutTabs);
