import { HOME_URL } from "@/config/config";
import { setTabsList, setTabsActive } from "@/redux/modules/tabs/action";
import { routerArray } from "@/routers";
import { searchRoute } from "@/utils/util";
import { HomeFilled } from "@ant-design/icons";
import { Tabs, message } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const LayoutTabs = (props: any) => {
	const { TabPane } = Tabs;
	const { pathname } = useLocation();
	const [activeValue, setActiveValue] = useState<string>(pathname);

	const { setTabsList, tabsList } = props;

	useEffect(() => {
		addTabs();
	}, [pathname]);

	const navigate = useNavigate();

	const tabsClick = (path: string) => {
		navigate(path);
	};

	const addTabs = () => {
		const route = searchRoute(pathname, routerArray);
		let tabsList = JSON.parse(JSON.stringify(props.tabsList));
		if (props.tabsList.every((item: any) => item.path !== route?.path)) {
			tabsList.push({ title: route?.meta!.title, path: route?.path });
		}
		setTabsList(tabsList);
		setActiveValue(pathname);
	};

	// delete tabs
	const delTabs = (tabPath: string) => {
		if (tabPath === pathname) {
			props.tabsList.forEach((item: Menu.MenuOptions, index: number) => {
				if (item.path !== tabPath) return;
				const nextTab = props.tabsList[index + 1] || props.tabsList[index - 1];
				if (!nextTab) return;
				navigate(nextTab.path);
			});
		}
		message.success("删除Tabs标签 😆😆😆");
		props.setTabsList(props.tabsList.filter((item: Menu.MenuOptions) => item.path !== tabPath));
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
const mapDispatchToProps = { setTabsList, setTabsActive };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutTabs);
