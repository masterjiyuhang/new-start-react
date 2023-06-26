import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppstoreOutlined, AreaChartOutlined, HomeOutlined, TableOutlined } from "@ant-design/icons";
import Logo from "./components/Logo";
import "./index.scss";
// import { Link } from "react-router-dom";
import type { MenuProps } from "antd";

const LayoutMenu = () => {
	const { pathname } = useLocation();
	const [menuActive, setMenuActive] = useState(pathname);

	const getSubMenuActive = () => {
		menuList.forEach(item => {
			if (item.children) {
				item.children.forEach(child => {
					if (child.key === pathname) {
						setSubMenuActive(child.key);
					}
				});
			}
		});
	};

	const menuList = [
		{
			label: "首页",
			key: "/home",
			danger: false,
			icon: <HomeOutlined />
		},
		{
			label: "数据大屏",
			key: "/dataScreen",
			icon: <AreaChartOutlined />
		},
		{
			label: "超级表格",
			key: "/proTable",
			icon: <TableOutlined />,
			children: [
				{
					label: "使用 Hooks",
					key: "/proTable/useHooks",
					icon: <AppstoreOutlined />
				},
				{
					label: "使用 Component",
					key: "/proTable/useComponent",
					icon: <AppstoreOutlined />
				}
			]
		}
	];
	useEffect(() => {
		getSubMenuActive();
		setMenuActive(pathname);
	}, [pathname]);

	const navigate = useNavigate();

	// 点击菜单
	const clickMenu: MenuProps["onClick"] = e => navigate(e.key);

	const [subMenuActive, setSubMenuActive] = useState("");

	const openSubMenu = (openKeys: any) => {
		if (openKeys.length > 0) {
			setSubMenuActive(openKeys[1]);
		} else {
			return setSubMenuActive("");
		}
	};

	return (
		<div className="menu">
			<Logo />
			<Menu
				theme="dark"
				mode="inline"
				triggerSubMenuAction="click"
				openKeys={[subMenuActive]}
				selectedKeys={[menuActive]}
				items={menuList}
				onClick={clickMenu}
				onOpenChange={openSubMenu}
			></Menu>
		</div>
	);
};

export default LayoutMenu;
