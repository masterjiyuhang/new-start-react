import useAuthButtons from "@/hooks/useAuthButtons";
import useHooksTable from "@/hooks/useHooks/index";
import { Button, DatePicker, Space } from "antd";
import { useEffect } from "react";
import "./index.scss";

const UseHooks = () => {
	const Table = useHooksTable();
	const { BUTTONS } = useAuthButtons();

	const { RangePicker } = DatePicker;

	useEffect(() => {
		console.log(BUTTONS);
	}, []);
	return (
		<div className="content-box card">
			<div className="date">
				<span>切换国际化的时候看我 😎 ：</span>
				<RangePicker />
			</div>
			<div className="auth">
				<Space>
					{BUTTONS.add && <Button type="primary">我是 Admin && User 能看到的按钮</Button>}
					{BUTTONS.delete && <Button type="primary">我是 Admin 能看到的按钮</Button>}
					{BUTTONS.edit && <Button type="primary">我是 User 能看到的按钮</Button>}
				</Space>
			</div>
			{Table}
		</div>
	);
};

export default UseHooks;
