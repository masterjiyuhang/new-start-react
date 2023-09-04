import SwitchDark from "@/components/SwitchDark";
import { FireOutlined, SettingOutlined, SkinOutlined } from "@ant-design/icons";
import { Divider, Drawer, Switch, Tooltip } from "antd";
import React, { useState } from "react";
// import { setThemeConfig, setWeakOrGray } from "@/redux/modules/global/action";
// import { connect } from "react-redux";
// import { updateCollapse } from "@/redux/modules/menu/action";
import { RootState, useDispatch, useSelector } from "@/redux-toolkit";
import { setThemeConfig } from "@/redux-toolkit/reducer/global";
import { updateCollapse } from "@/redux-toolkit/reducer/menu";

const Theme = () => {
	const [visible, setVisible] = useState<boolean>(false);

	const dispatch = useDispatch();
	const { themeConfig } = useSelector((state: RootState) => state.global);
	const { weakOrGray, breadcrumb, tabs, footer } = themeConfig;
	const { isCollapse } = useSelector((state: RootState) => state.menu);

	// const { setThemeConfig, updateCollapse } = props;
	// const { isCollapse } = props.menu;
	// const { themeConfig } = props.globalReducer;
	// const { weakOrGray, breadcrumb, tabs, footer } = themeConfig;

	const setWeakOrGray = (checked: boolean, theme: string) => {
		if (checked) return dispatch(setThemeConfig({ ...themeConfig, weakOrGray: theme }));
		dispatch(setThemeConfig({ ...themeConfig, weakOrGray: "" }));
	};

	const onChange = (checked: boolean, keyName: string) => {
		return dispatch(setThemeConfig({ ...themeConfig, [keyName]: checked }));
	};

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	return (
		<>
			<Tooltip placement="bottom" title={"主题"}>
				<SkinOutlined className="icon-style" onClick={showDrawer} />
			</Tooltip>
			<Drawer title="主题设置" closable={false} onClose={onClose} open={visible}>
				<Divider style={{ margin: "0 0 16px 0" }}>
					<FireOutlined />
					全局主题
				</Divider>

				<div className="theme-item">
					<span>暗黑模式</span>
					<SwitchDark />
				</div>
				<div className="theme-item">
					<span>灰色模式</span>
					<Switch
						size="default"
						checked={weakOrGray === "gray"}
						onChange={e => {
							setWeakOrGray(e, "gray");
						}}
					/>
				</div>
				<div className="theme-item">
					<span>色弱模式</span>
					<Switch
						size="default"
						checked={weakOrGray === "weak"}
						onChange={e => {
							setWeakOrGray(e, "weak");
						}}
					/>
				</div>
				<br />
				<Divider className="divider">
					<SettingOutlined />
					界面设置
				</Divider>
				<div className="theme-item">
					<span>折叠菜单</span>
					<Switch
						checked={isCollapse}
						onChange={e => {
							dispatch(updateCollapse(e));
						}}
					/>
				</div>
				<div className="theme-item">
					<span>面包屑导航</span>
					<Switch
						checked={breadcrumb}
						onChange={e => {
							onChange(e, "breadcrumb");
						}}
					/>
				</div>
				<div className="theme-item">
					<span>标签栏</span>
					<Switch
						checked={tabs}
						onChange={e => {
							onChange(e, "tabs");
						}}
					/>
				</div>
				<div className="theme-item">
					<span>页脚</span>
					<Switch
						checked={footer}
						onChange={e => {
							onChange(e, "footer");
						}}
					/>
				</div>
			</Drawer>
		</>
	);
};

// const mapStateToProps = (state: any) => state;
// const mapDispatchToProps = { setWeakOrGray, setThemeConfig, updateCollapse };
// export default connect(mapStateToProps, mapDispatchToProps)(Theme);
export default Theme;
