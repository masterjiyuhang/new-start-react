import { Menu, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./components/Logo";
import "./index.scss";
import type { MenuProps } from "antd";
import { findAllBreadcrumb, getOpenKeys, handleRouter } from "@/utils/util";
// import { AppstoreOutlined, AreaChartOutlined, HomeOutlined, TableOutlined } from "@ant-design/icons";
import * as Icons from "@ant-design/icons";
// import { HOME_URL } from "@/config/config";
import { getMenuList } from "@/api/modules/login";
import { connect } from "react-redux";
import { updateCollapse, setMenuList } from "@/redux/modules/menu/action";
import { setBreadcrumbList } from "@/redux/modules/breadcrumb/action";
import { setAuthRouter } from "@/redux/modules/auth/action";

type MenuItem = Required<MenuProps>["items"][number];

const LayoutMenu = (props: any) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [menuList, setMenuList] = useState<MenuItem[]>([]);
	const { setAuthRouter } = props;

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
			if (!data) return;
			setMenuList(deepLoopFloat(data));
			// 存储处理过后的所有面包屑导航栏到 redux 中
			props.setBreadcrumbList(findAllBreadcrumb(data));
			const dynamicRouter = handleRouter(data);
			setAuthRouter(dynamicRouter);
			props.setMenuList(data);
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

	// 刷新页面保持菜单高亮
	useEffect(() => {
		setSelectedKeys([pathname]);
		props.isCollapse ? null : setOpenKeys(getOpenKeys(pathname));
	}, [pathname, props.isCollapse]);

	// 动态获取menu菜单
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
const mapDispatchToProps = { updateCollapse, setMenuList, setBreadcrumbList, setAuthRouter };
const mapStateToProps = (state: any) => state.menu;
export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu);
