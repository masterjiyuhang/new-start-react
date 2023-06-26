import { Button, message } from "antd";
import "./index.scss";

const Login = () => {
	return (
		<Button
			type="primary"
			onClick={() => {
				message.success("登陆成功！");
			}}
		>
			登陆
		</Button>
	);
};

export default Login;
