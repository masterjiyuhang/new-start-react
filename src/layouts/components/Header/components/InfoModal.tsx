import { Modal, message } from "antd";
import React, { type Ref, useImperativeHandle, useState } from "react";

interface Props {
	innerRef: Ref<{ showModal: (params: any) => void } | undefined>;
}
export default function InfoModal(props: Props) {
	const [modelVisible, setModelVisible] = useState(false);

	const showModal = () => {
		setModelVisible(true);
	};

	const handleOk = () => {
		setModelVisible(false);
		message.success("修改用户信息成功");
	};

	const handleCancel = () => {
		setModelVisible(false);
	};

	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));
	return (
		<Modal title="user info" open={modelVisible} onCancel={handleCancel} onOk={handleOk}>
			<p>User Info..</p>
			<p>User Info..</p>
			<p>User Info..</p>
			<p>User Info..</p>
		</Modal>
	);
}
