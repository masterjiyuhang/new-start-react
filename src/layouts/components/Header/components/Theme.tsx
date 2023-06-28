import { SkinOutlined } from "@ant-design/icons";
import { Drawer, Tooltip } from "antd";
import React, { useState } from "react";

const Theme = () => {
	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	return (
		<>
			<Tooltip placement="bottom" title={"主题"}>
				<SkinOutlined className="icon-style" onClick={showDrawer} />
			</Tooltip>
			<Drawer
				title="主题设置"
				closable={false}
				onClose={onClose}
				open={visible}
				// footerStyle={{ display: "flex", justifyContent: "flex-end" }}
				// footer={
				// 	<Space size={"middle"}>
				// 		<Button onClick={onClose}>Cancel</Button>
				// 		<Button type="primary" onClick={onClose}>
				// 			OK
				// 		</Button>
				// 	</Space>
				// }
			>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Drawer>
		</>
	);
};

export default Theme;
