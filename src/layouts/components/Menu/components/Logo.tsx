import logo from "@/assets/images/logo.png";
import { connect } from "react-redux";

const Logo = (props: any) => {
	const name = import.meta.env.VITE_GLOBAL_APP_TITLE;
	return (
		<div className="logo-box">
			<img src={logo} alt="logo" className="logo-img" />
			{!props.isCollapse ? <h2 className="logo-text">{name}</h2> : null}
		</div>
	);
};

const mapStateToProps = (state: any) => state.menu;
export default connect(mapStateToProps)(Logo);
