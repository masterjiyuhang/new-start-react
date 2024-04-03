import React from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import { HOME_URL } from "@/config/config";

const NotFound: React.FC = () => {
	const navigate = useNavigate();

	const goHome = () => {
		navigate(HOME_URL);
	};

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
