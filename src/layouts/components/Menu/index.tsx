import { Menu, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./components/Logo";
import "./index.scss";
import type { MenuProps } from "antd";
import { getOpenKeys } from "@/utils/util";
// import { AppstoreOutlined, AreaChartOutlined, HomeOutlined, TableOutlined } from "@ant-design/icons";
import * as Icons from "@ant-design/icons";
// import { HOME_URL } from "@/config/config";
import { getMenuList } from "@/api/modules/login";
import { connect } from "react-redux";
import { updateCollapse } from "@/redux/modules/menu/action";

const LayoutMenu = (props: any) => {
	const navigate = useNavigate();

	const { pathname } = useLocation();
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
	const [openKeys, setOpenKeys] = useState<string[]>([]);

	const [loading, setLoading] = useState<boolean>(false);

	type MenuItem = Required<MenuProps>["items"][number];
	const [menuList, setMenuList] = useState<MenuItem[]>([]);

	const getItem = (
		label: React.ReactNode,
		key?: React.Key | null,
		icon?: React.ReactNode,
		children?: MenuItem[],
		type?: "group"
	): MenuItem => {
		return {
			key,
			icon,
			children,
			label,
			type
		} as MenuItem;
	};

	const getMenuData = async () => {
		setLoading(true);
		try {
			const { data } = await getMenuList();
			data && setMenuList(deepLoopFloat(data));
		} finally {
			setLoading(false);
		}
	};

	/**
	 * 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
	 */
	const deepLoopFloat = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {
		menuList.forEach((item: Menu.MenuOptions) => {
			// 下面判断解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
			if (!item?.children?.length) return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
			newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopFloat(item.children)));
		});
		return newArr;
	};

	// 动态渲染 Icon
	const customIcons: { [key: string]: any } = Icons;
	const addIcon = (name: string) => {
		return React.createElement(customIcons[name]);
	};

	useEffect(() => {
		setSelectedKeys([pathname]);
		props.isCollapse ? null : setOpenKeys(getOpenKeys(pathname));
	}, [pathname, props.isCollapse]);

	useEffect(() => {
		getMenuData();
	}, []);

	// 设置当前展开的 subMenu
	const onOpenChange = (openKeys: string[]) => {
		if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
		const latestOpenKey = openKeys[openKeys.length - 1];
		// 最新展开的 SubMenu
		if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
		setOpenKeys([latestOpenKey]);
	};

	// 点击菜单
	const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => navigate(key);

	// const menuList = [
	// 	{
	// 		label: "首页",
	// 		key: HOME_URL,
	// 		icon: <HomeOutlined />
	// 	},
	// 	{
	// 		label: "数据大屏",
	// 		key: "/dataScreen",
	// 		icon: <AreaChartOutlined />
	// 	},
	// 	{
	// 		label: "超级表格",
	// 		key: "/proTable",
	// 		icon: <TableOutlined />,
	// 		children: [
	// 			{
	// 				label: "使用 Hooks",
	// 				key: "/proTable/useHooks",
	// 				icon: <AppstoreOutlined />
	// 			},
	// 			{
	// 				label: "使用 Component",
	// 				key: "/proTable/useComponent",
	// 				icon: <AppstoreOutlined />
	// 			}
	// 		]
	// 	}
	// ];

	return (
		<div className="menu">
			<Spin spinning={loading} tip="Loading...">
				<Logo />
				<Menu
					theme="dark"
					mode="inline"
					triggerSubMenuAction="click"
					openKeys={openKeys}
					selectedKeys={selectedKeys}
					items={menuList}
					onClick={clickMenu}
					onOpenChange={onOpenChange}
				></Menu>
			</Spin>
		</div>
	);
};

// export default LayoutMenu;
const mapDispatchToProps = { updateCollapse };
const mapStateToProps = (state: any) => state.menu;
export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu);
