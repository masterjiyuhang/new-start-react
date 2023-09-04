import { HOME_URL } from "@/config/config";
import { routerArray } from "@/routers";
import { searchRoute } from "@/utils/util";
import { HomeFilled } from "@ant-design/icons";
import { Tabs, TabsProps, message } from "antd";
import { useEffect, useState } from "react";
// import { setTabsList, setTabsActive } from "@/redux/modules/tabs/action";
// import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MoreButton from "@/layouts/components/Tabs/components/MoreButton";
import "./index.scss";
import { RootState, useDispatch, useSelector } from "@/redux-toolkit";
import { setTabsList } from "@/redux-toolkit/reducer/tabs";

const LayoutTabs = () => {
	const { pathname } = useLocation();
	const [activeValue, setActiveValue] = useState<string>(pathname);

	const { tabsList } = useSelector((state: RootState) => state.tabs);

	const { tabs: isShowTabs } = useSelector((state: RootState) => state.global.themeConfig);

	const dispatch = useDispatch();
	// const { tabsList: propsTabsList } = props.tabsReducer;
	// const { setTabsList: propsSetTabsList } = props;
	// const {
	// 	themeConfig: { tabs: isShowTabs }
	// } = props.globalReducer;

	useEffect(() => {
		addTabs();
	}, [pathname]);

	const navigate = useNavigate();

	const tabsClick = (path: string) => {
		navigate(path);
	};

	const addTabs = () => {
		const route = searchRoute(pathname, routerArray);
		let newTabsList = JSON.parse(JSON.stringify(tabsList));
		if (tabsList.every((item: any) => item.path !== route?.path)) {
			newTabsList.push({ title: route?.meta!.title, path: route?.path });
		}
		dispatch(setTabsList(newTabsList));
		setActiveValue(pathname);
	};

	// delete tabs
	const delTabs = (tabPath: string) => {
		// 首页不能被删除
		if (tabPath === HOME_URL) return;
		if (pathname === tabPath) {
			tabsList.forEach((item: Menu.MenuOptions, index: number) => {
				if (item.path !== pathname) return;
				const nextTab = tabsList[index + 1] || tabsList[index - 1];
				if (!nextTab) return;
				navigate(nextTab.path);
			});
		}
		message.success("删除Tabs标签 😆😆😆");
		dispatch(setTabsList(tabsList.filter((item: Menu.MenuOptions) => item.path !== tabPath)));
	};

	const currentTabsList: TabsProps["items"] = tabsList.map((item: Menu.MenuOptions) => {
		return {
			label: (
				<span>
					{item.path == HOME_URL ? <HomeFilled /> : ""}
					{item.title}
				</span>
			),
			key: item.path,
			closable: item.path !== HOME_URL
		};
	}) as TabsProps["items"];

	return (
		isShowTabs && (
			<div className="tabs">
				<Tabs
					activeKey={activeValue}
					onChange={tabsClick}
					hideAdd
					type="editable-card"
					onEdit={path => {
						delTabs(path as string);
					}}
					items={currentTabsList}
				></Tabs>
				<MoreButton delTabs={delTabs} />
			</div>
		)
	);
};

// const mapStateToProps = (state: any) => state;
// const mapDispatchToProps = { setTabsList, setTabsActive };
// export default connect(mapStateToProps, mapDispatchToProps)(LayoutTabs);
export default LayoutTabs;
