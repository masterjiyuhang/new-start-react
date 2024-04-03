import { useRootStore } from "@/mobx-store";
import { Button } from "antd";
import { observer } from "mobx-react-lite";

const Menu1 = () => {
	const { counterStore: store } = useRootStore();

	return (
		<div className="card content-box">
			<span className="text">Menu1 🍓🍇🍈🍉</span>

			<Button
				onClick={() => {
					store.increment();
				}}
			>
				++
			</Button>
			<Button>{store.count}</Button>
			<Button
				onClick={() => {
					store.decrement();
				}}
			>
				--
			</Button>
		</div>
	);
};

export default observer(Menu1);
