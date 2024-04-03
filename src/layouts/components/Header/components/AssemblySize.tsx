import { setAssemblySize } from "@/redux/modules/global/action";
import { LayoutOutlined } from "@ant-design/icons";
import { Dropdown, Tooltip } from "antd";
import type { MenuProps } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";

const AssemblySize = (props: any) => {
	const [open, setOpen] = useState(false);
	const { setAssemblySize } = props;

	const handleMenuClick: MenuProps["onClick"] = e => {
		setAssemblySize(e.key);
	};

	const handleOpenChange = (flag: boolean) => {
		setOpen(flag);
	};

	const items: MenuProps["items"] = [
		{
			key: "middle",
			disabled: props.assemblySize === "middle",
			label: <span>默认</span>
		},
		{
			key: "large",
			disabled: props.assemblySize === "large",
			label: <span>大型</span>
		},
		{
			key: "small",
			disabled: props.assemblySize === "small",
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

const mapStateToProps = (state: any) => state.globalReducer;
const mapDispatchToProps = { setAssemblySize };
export default connect(mapStateToProps, mapDispatchToProps)(AssemblySize);
