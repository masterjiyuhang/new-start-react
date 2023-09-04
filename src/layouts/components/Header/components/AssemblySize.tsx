import { RootState, useDispatch, useSelector } from "@/redux-toolkit";
import { setAssemblySize } from "@/redux-toolkit/reducer/global";
import { LayoutOutlined } from "@ant-design/icons";
import { Dropdown, Tooltip } from "antd";
import type { MenuProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useState } from "react";
// import { setAssemblySize } from "@/redux/modules/global/action";
// import { connect } from "react-redux";

const AssemblySize = () => {
	const [open, setOpen] = useState(false);

	const dispatch = useDispatch();
	const { assemblySize } = useSelector((state: RootState) => state.global);

	const handleMenuClick: MenuProps["onClick"] = e => {
		dispatch(setAssemblySize(e.key as SizeType));
	};

	const handleOpenChange = (flag: boolean) => {
		setOpen(flag);
	};

	const items: MenuProps["items"] = [
		{
			key: "middle",
			disabled: assemblySize == "middle",
			label: <span>默认</span>
		},
		{
			key: "large",
			disabled: assemblySize == "large",
			label: <span>大型</span>
		},
		{
			key: "small",
			disabled: assemblySize == "small",
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

// const mapStateToProps = (state: any) => state.globalReducer;
// const mapDispatchToProps = { setAssemblySize };
// export default connect(mapStateToProps, mapDispatchToProps)(AssemblySize);
export default AssemblySize;
