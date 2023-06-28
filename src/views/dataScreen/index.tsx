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
		<>
			<Button type="primary" onClick={requestMenuList}>
				发起网络请求
			</Button>
			<Button danger type="dashed" onClick={increment}>
				increment: {count}
			</Button>
		</>
	);
};

const mapStateToProps = (state: any) => state.countReducer;
const mapDispatchToProps = { incrementAsync, increment, decrement };
export default connect(mapStateToProps, mapDispatchToProps)(dataScreen);
