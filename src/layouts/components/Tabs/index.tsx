import { HOME_URL } from "@/config/config";
import { setTabsList, setTabsActive } from "@/redux/modules/tabs/action";
import { routerArray } from "@/routers";
import { searchRoute } from "@/utils/util";
import { HomeFilled } from "@ant-design/icons";
import { Tabs, type TabsProps, message } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MoreButton from "@/layouts/components/Tabs/components/MoreButton";
import "./index.scss";
import { toPath } from "lodash-es";

const LayoutTabs = (props: any) => {
	const { pathname } = useLocation();
	const [activeValue, setActiveValue] = useState<string>(pathname);

	const { tabsList: propsTabsList } = props.tabsReducer;
	const { setTabsList: propsSetTabsList } = props;
	const {
		themeConfig: { tabs: isShowTabs }
	} = props.globalReducer;

	useEffect(() => {
		addTabs();
	}, [pathname]);

	const navigate = useNavigate();

	const tabsClick = (path: string) => {
		navigate(path);
	};

	const addTabs = () => {
		const route = searchRoute(pathname, routerArray);
		let tabsList = JSON.parse(JSON.stringify(propsTabsList));
		if (propsTabsList.every((item: any) => item.path !== route?.path)) {
			tabsList.push({ title: route?.meta!.title, path: route?.path });
		}
		propsSetTabsList(tabsList);
		setActiveValue(pathname);
	};

	// delete tabs
	const delTabs = (tabPath?: string) => {
		console.log(toPath, "这事啥");
		// 首页不能被删除
		if (tabPath === HOME_URL) return;
		if (pathname === tabPath) {
			propsTabsList.forEach((item: Menu.MenuOptions, index: number) => {
				if (item.path !== pathname) return;
				const nextTab = propsTabsList[index + 1] || propsTabsList[index - 1];
				if (!nextTab) return;
				navigate(nextTab.path);
			});
		}
		message.success("删除Tabs标签 😆😆😆");
		propsSetTabsList(propsTabsList.filter((item: Menu.MenuOptions) => item.path !== tabPath));
	};

	const currentTabsList: TabsProps["items"] = propsTabsList.map((item: Menu.MenuOptions) => {
		return {
			label: (
				<span>
					{item.path === HOME_URL ? <HomeFilled /> : ""}
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
				<MoreButton delTabs={delTabs} tabsList={propsTabsList} setTabsList={propsSetTabsList} />
			</div>
		)
	);
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = { setTabsList, setTabsActive };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutTabs);
