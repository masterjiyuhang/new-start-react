import { setThemeConfig } from "@/redux/modules/global/action";
import "./index.scss";
import { connect } from "react-redux";

const LayoutFooter = (props: any) => {
	const {
		themeConfig: { footer: isShowFooter }
	} = props;
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

const mapStateToProps = (state: any) => state.globalReducer;
const mapDispatchToProps = { setThemeConfig };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutFooter);
