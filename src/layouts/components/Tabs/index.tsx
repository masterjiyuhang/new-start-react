import { HOME_URL } from "@/config/config";
import { setTabsList, setTabsActive } from "@/redux/modules/tabs/action";
import { routerArray } from "@/routers";
import { searchRoute } from "@/utils/util";
import { DownOutlined, HomeFilled } from "@ant-design/icons";
import { Button, Dropdown, Menu, MenuProps, Tabs, TabsProps, message } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.scss";

const LayoutTabs = (props: any) => {
	// const { TabPane } = Tabs;
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
	const delTabs = () => {
		// 首页不能被删除
		if (pathname === HOME_URL) return;
		props.tabsList.forEach((item: Menu.MenuOptions, index: number) => {
			if (item.path !== pathname) return;
			const nextTab = props.tabsList[index + 1] || props.tabsList[index - 1];
			if (!nextTab) return;
			navigate(nextTab.path);
		});
		message.success("删除Tabs标签 😆😆😆");
		props.setTabsList(props.tabsList.filter((item: Menu.MenuOptions) => item.path !== pathname));
	};

	// close multipleTab
	const closeMultipleTab = (tabPath?: string) => {
		const handleTabsList = props.tabsList.filter((item: Menu.MenuOptions) => {
			return item.path === tabPath || item.path === HOME_URL;
		});
		props.setTabsList(handleTabsList);
		tabPath ?? navigate(HOME_URL);
	};

	const items: MenuProps["items"] = [
		{
			label: <span>关闭当前</span>,
			key: "closeCurrent"
		},
		{
			label: <span>关闭其他</span>,
			key: "closeOthers"
		},
		{
			label: <span>关闭所有</span>,
			key: "closeAll"
		}
	];

	const dropdownItemClick: MenuProps["onClick"] = ({ key }) => {
		switch (key) {
			case "closeCurrent":
				delTabs();
				break;
			case "closeOthers":
				closeMultipleTab(pathname);
				break;
			default:
				closeMultipleTab();
				break;
		}
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
		<div className="tabs">
			<Tabs
				activeKey={activeValue}
				onChange={tabsClick}
				hideAdd
				type="editable-card"
				onEdit={() => {
					delTabs();
				}}
				items={currentTabsList}
			></Tabs>
			<Dropdown
				menu={{ items, onClick: dropdownItemClick }}
				placement="bottom"
				arrow={{ pointAtCenter: true }}
				trigger={["click"]}
			>
				<Button className="more-button" type="primary" size="small">
					更多 <DownOutlined />
				</Button>
			</Dropdown>
		</div>
	);
};

const mapStateToProps = (state: any) => state.tabsReducer;
const mapDispatchToProps = { setTabsList, setTabsActive };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutTabs);
