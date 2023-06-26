import React from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

const NotFound: React.FC = () => {
	const navigate = useNavigate();

	const goHome = () => navigate("/home");

	return (
		<Result
			status={"404"}
			title={"404"}
			subTitle="Sorry, the page you visited does not exist."
			extra={
				<Button type="primary" onClick={goHome}>
					Back Home
				</Button>
			}
		></Result>
	);
};

export default NotFound;
