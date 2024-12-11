import { Button } from "antd";
import { getMenuList } from "@/api/modules/login";
import { incrementAsync, increment, decrement } from "@/redux/modules/count/action";
import { connect } from "react-redux";

const dataScreen = (props: any) => {
	const { count, increment } = props;
	const requestMenuList = async () => {
		const res = await getMenuList();
		console.log(res);
	};

	return (
		<div className="content-box">
			<span className="text">DataScreen 🍓🍇🍈🍉</span>
			<Button type="primary" onClick={requestMenuList}>
				发起网络请求
			</Button>
			<Button danger type="dashed" className="mt-2" onClick={increment}>
				increment: {count}
			</Button>
		</div>
	);
};

const mapStateToProps = (state: any) => state.countReducer;
const mapDispatchToProps = { incrementAsync, increment, decrement };
export default connect(mapStateToProps, mapDispatchToProps)(dataScreen);
