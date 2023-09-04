// import { setThemeConfig } from "@/redux/modules/global/action";
import { RootState, useSelector } from "@/redux-toolkit";
import "./index.scss";
// import { connect } from "react-redux";

const LayoutFooter = () => {
	// const {
	// 	themeConfig: { footer: isShowFooter }
	// } = props;
	const { footer: isShowFooter } = useSelector((state: RootState) => state.global.themeConfig);
	return (
		isShowFooter && (
			<div className="footer">
				<a href="" target="_blank" rel="noreferrer">
					2022 © CCH-Admin By ErHang.
				</a>
			</div>
		)
	);
};

// const mapStateToProps = (state: any) => state.globalReducer;
// const mapDispatchToProps = { setThemeConfig };
// export default connect(mapStateToProps, mapDispatchToProps)(LayoutFooter);
export default LayoutFooter;
