import { Button } from "antd";
import { observer } from "mobx-react-lite";
import store from "@/mobx-store/index";

const Menu1 = () => {
	return (
		<div className="card content-box">
			<span className="text">Menu1 🍓🍇🍈🍉</span>

			<Button onClick={() => store.increment()}>++</Button>
			<Button onClick={() => store.decrement()}>--</Button>
			<Button>{store.count}</Button>
		</div>
	);
};

export default observer(Menu1);
