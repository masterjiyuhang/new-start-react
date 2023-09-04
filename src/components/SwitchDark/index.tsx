// import { setThemeConfig } from "@/redux/modules/global/action";
import { RootState, useDispatch, useSelector } from "@/redux-toolkit";
import { setThemeConfig } from "@/redux-toolkit/reducer/global";
import { Switch } from "antd";
import React from "react";
// import { connect } from "react-redux";

const SwitchDark = () => {
	const dispatch = useDispatch();
	const { themeConfig } = useSelector((state: RootState) => state.global);
	// const { setThemeConfig, themeConfig } = props;
	const onChange = (checked: boolean) => {
		dispatch(setThemeConfig({ ...themeConfig, isDark: checked }));
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

export default SwitchDark;
// const mapStateToProps = (state: any) => state.globalReducer;
// const mapDispatchToProps = { setThemeConfig };
// export default connect(mapStateToProps, mapDispatchToProps)(SwitchDark);
