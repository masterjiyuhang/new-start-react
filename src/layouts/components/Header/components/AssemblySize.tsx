import { LayoutOutlined } from "@ant-design/icons";
import { Dropdown, Tooltip } from "antd";
import type { MenuProps } from "antd";
import React, { useState } from "react";

const AssemblySize = () => {
	const [open, setOpen] = useState(false);

	const handleMenuClick: MenuProps["onClick"] = e => {
		if (e.key === "3") {
			setOpen(false);
		}
	};

	const handleOpenChange = (flag: boolean) => {
		setOpen(flag);
	};

	const items: MenuProps["items"] = [
		{
			key: "1",
			label: <span>默认</span>
		},
		{
			key: "2",
			label: <span>大型</span>
		},
		{
			key: "3",
			label: <span>小型</span>
		}
	];
	return (
		<Dropdown
			menu={{
				items,
				onClick: handleMenuClick
			}}
			onOpenChange={handleOpenChange}
			open={open}
		>
			<Tooltip placement="topRight" title="组件大小">
				<LayoutOutlined className="icon-style" />
			</Tooltip>
		</Dropdown>
	);
};

export default AssemblySize;
