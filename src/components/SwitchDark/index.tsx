import { setThemeConfig } from "@/redux/modules/global/action";
import { Switch } from "antd";
import React from "react";
import { connect } from "react-redux";

const SwitchDark = (props: any) => {
	const { setThemeConfig, themeConfig } = props;
	const onChange = (checked: boolean) => {
		setThemeConfig({ ...themeConfig, isDark: checked });
	};

	return (
		<Switch
			className="dark"
			defaultChecked={themeConfig.isDark}
			checkedChildren={<>🌞</>}
			unCheckedChildren={<>🌜</>}
			onChange={onChange}
		/>
	);
};

// export default SwitchDark;
const mapStateToProps = (state: any) => state.globalReducer;
const mapDispatchToProps = { setThemeConfig };
export default connect(mapStateToProps, mapDispatchToProps)(SwitchDark);
