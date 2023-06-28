import { Login } from "@/api/interface";
import { CloseCircleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import md5 from "js-md5";
import { loginApi } from "@/api/modules/login";
import { HOME_URL } from "@/config/config";

const LoginForm = () => {
	const Item = Form.Item;
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);
	const [messageApi, contextHolder] = message.useMessage();
	const navigate = useNavigate();

	// 登录
	const onFinish = async (values: Login.ReqLoginForm) => {
		try {
			setLoading(true);
			values.password = md5(values.password);
			await loginApi(values);
			messageApi.success("login successfully");
			navigate(HOME_URL);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	const onFinishFailed = (errorInfo: any) => {
		console.log(errorInfo);
		messageApi.error("login failed", 2);
	};

	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
			<Item name="username" rules={[{ required: true, message: "please input your user name!" }]}>
				<Input placeholder="user name : admin / user" prefix={<UserOutlined />}></Input>
			</Item>
			<Item name="password" rules={[{ required: true, message: "please input your password!" }]} initialValue={"12345678"}>
				<Input.Password autoComplete="new-password" placeholder="password: 12345678" prefix={<LockOutlined />} />
			</Item>
			<Item className="login-btn">
				<Button icon={<CloseCircleOutlined />} onClick={() => form.resetFields()}>
					重置 {contextHolder}
				</Button>
				<Button type="primary" icon={<UserOutlined />} htmlType="submit" loading={loading}>
					登录
				</Button>
			</Item>
		</Form>
	);
};

export default LoginForm;
