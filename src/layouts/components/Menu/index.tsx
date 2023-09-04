import { Menu, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./components/Logo";
import "./index.scss";
import type { MenuProps } from "antd";
import { findAllBreadcrumb, getOpenKeys, handleRouter, searchRoute } from "@/utils/util";
// import { AppstoreOutlined, AreaChartOutlined, HomeOutlined, TableOutlined } from "@ant-design/icons";
import * as Icons from "@ant-design/icons";
// import { HOME_URL } from "@/config/config";
import { getMenuList } from "@/api/modules/login";
import { RootState, useDispatch, useSelector } from "@/redux-toolkit";
import { setMenuList as reduxSetMenuList } from "@/redux-toolkit/reducer/menu";
import { setBreadcrumbList } from "@/redux-toolkit/reducer/breadcrumb";
import { setAuthRouter } from "@/redux-toolkit/reducer/auth";
// import { connect } from "react-redux";
// import { updateCollapse, setMenuList } from "@/redux/modules/menu/action";
// import { setBreadcrumbList } from "@/redux/modules/breadcrumb/action";
// import { setAuthRouter } from "@/redux/modules/auth/action";

type MenuItem = Required<MenuProps>["items"][number];

const LayoutMenu = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [menuList, setMenuList] = useState<MenuItem[]>([]);
	// const { setAuthRouter } = props;
	// const { isDark } = props.globalReducer.themeConfig;
	const { isDark } = useSelector((state: RootState) => state.global.themeConfig);

	const dispatch = useDispatch();

	const { isCollapse, menuList: reduxMenuList } = useSelector((state: RootState) => state.menu);

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
			dispatch(setBreadcrumbList(findAllBreadcrumb(data)));
			const dynamicRouter = handleRouter(data);
			dispatch(setAuthRouter(dynamicRouter));
			dispatch(reduxSetMenuList(data));
		} catch (error) {
			console.log(error);
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
		isCollapse ? null : setOpenKeys(getOpenKeys(pathname));
	}, [pathname, isCollapse]);

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
	const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
		const route = searchRoute(key, reduxMenuList);
		if (route?.isLink) window.open(route.isLink, "_blank");
		navigate(key);
	};

	return (
		<div className="menu">
			<Spin spinning={loading} tip="Loading...">
				<Logo isCollapse={isCollapse} />
				<Menu
					theme={isDark ? "dark" : "light"}
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

export default LayoutMenu;
// const mapDispatchToProps = { updateCollapse, setMenuList, setBreadcrumbList, setAuthRouter };
// const mapStateToProps = (state: any) => state;
// export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu);
