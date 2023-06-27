import "./index.scss";
import LoginForm from "./components/LoginForm";
import LoginLeft from "@/assets/images/login_left4.png";
import logo from "@/assets/images/logo.png";

const Login = () => {
	return (
		<div className="login-container">
			<div className="login-content">
				<div className="login-left">
					<img src={LoginLeft} alt="login" />
				</div>
				<div className="login-form">
					<div className="login-logo">
						<img src={logo} alt="" className="login-icon" />
						<span className="login-text">Cch-Admin</span>
					</div>
					<LoginForm />
				</div>
			</div>
		</div>
	);
};

export default Login;
