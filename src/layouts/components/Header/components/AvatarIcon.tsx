import { Avatar, Dropdown, Modal, message } from "antd";
import avatar from "@/assets/images/avatar.png";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ExclamationCircleOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import InfoModal from "./InfoModal";
import PasswordModal from "./PasswordModal";

const AvatarIcon = () => {
	const navigate = useNavigate();
	interface ModalProps {
		showModal: (params: { name: number }) => void;
	}

	const passRef = useRef<ModalProps>(null!);
	const infoRef = useRef<ModalProps>(null!);

	const goHome = () => navigate("/home");

	const logout = () => {
		Modal.confirm({
			title: "请注意 🤔",
			icon: <ExclamationCircleOutlined />,
			content: "confirm logout?",
			okText: "sure",
			cancelText: "cancel",
			onOk: () => message.success(" logout successfully")
		});
	};

	const items: MenuProps["items"] = [
		{
			label: <span>首页</span>,
			key: "0"
		},
		{
			label: <span>个人信息</span>,
			key: "1"
		},
		{
			label: <span>修改密码</span>,
			key: "3"
		},
		{
			type: "divider"
		},
		{
			label: <span>退出登录</span>,
			key: "4"
		},
		{
			key: "11",
			label: (
				<a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
					1st menu item
				</a>
			)
		},
		{
			key: "21",
			label: (
				<a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
					2nd menu item (disabled)
				</a>
			),
			icon: <SmileOutlined />,
			disabled: true
		},
		{
			key: "31",
			label: (
				<a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
					3rd menu item (disabled)
				</a>
			),
			disabled: true
		},
		{
			key: "41",
			danger: true,
			label: "a danger item"
		}
	];

	const dropItemClick: MenuProps["onClick"] = ({ key }) => {
		switch (key) {
			case "0":
				goHome();
				break;
			case "1":
				infoRef.current.showModal({ name: 11 });
				break;
			case "3":
				passRef.current.showModal({ name: 11 });
				break;
			case "4":
				logout();
				break;
		}
	};
	return (
		<>
			<Dropdown menu={{ items, onClick: dropItemClick }}>
				<Avatar src={avatar} />
			</Dropdown>
			<InfoModal innerRef={infoRef}></InfoModal>
			<PasswordModal innerRef={passRef}></PasswordModal>
		</>
	);
};

export default AvatarIcon;
