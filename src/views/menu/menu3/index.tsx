import { useRootStore } from "@/mobx-store";
import TodoList from "./TodoList";

const Menu3 = () => {
	const {
		TestStore: { name }
	} = useRootStore();
	return (
		<div className="card content-box">
			<span className="text">Menu3 🍓🍇🍈🍉{name}</span>
			<TodoList />
		</div>
	);
};

export default Menu3;
