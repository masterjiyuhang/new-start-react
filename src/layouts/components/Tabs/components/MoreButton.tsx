import { HOME_URL } from "@/config/config";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
const MoreButton = (props: any) => {
	const { tabsList, delTabs } = props;
	let { t } = useTranslation();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const items: MenuProps["items"] = [
		{
			label: <span>{t("tabs.closeCurrent")}</span>,
			key: "closeCurrent"
		},
		{
			label: <span>{t("tabs.closeOther")}</span>,
			key: "closeOthers"
		},
		{
			label: <span>{t("tabs.closeAll")}</span>,
			key: "closeAll"
		}
	];

	// close multipleTab
	const closeMultipleTab = (tabPath?: string) => {
		const handleTabsList = tabsList.filter((item: Menu.MenuOptions) => {
			return item.path === tabPath || item.path === HOME_URL;
		});
		props.setTabsList(handleTabsList);
		tabPath ?? navigate(HOME_URL);
	};

	const dropdownItemClick: MenuProps["onClick"] = ({ key }) => {
		switch (key) {
			case "closeCurrent":
				() => delTabs(pathname);
				break;
			case "closeOthers":
				closeMultipleTab(pathname);
				break;
			default:
				closeMultipleTab();
				break;
		}
	};
	return (
		<Dropdown menu={{ items, onClick: dropdownItemClick }} placement="bottom" arrow={{ pointAtCenter: true }} trigger={["click"]}>
			<Button className="more-button" type="primary" size="small">
				{t("tabs.more")}
				<DownOutlined />
			</Button>
		</Dropdown>
	);
};

export default MoreButton;
