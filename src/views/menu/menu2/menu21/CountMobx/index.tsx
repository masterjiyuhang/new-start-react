import { useRootStore } from "@/mobx-store";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";

const CountMobx = () => {
	const {
		TestStore: { name, changeName }
	} = useRootStore();

	const [currentName, setCurrentName] = useState(name);
	return (
		<>
			<h1>{name}</h1>
			<span>{currentName}</span>
			<input
				type="text"
				onBlur={e => {
					setCurrentName(e.target.value);
					changeName(e.target.value);
				}}
			/>
		</>
	);
};

export default observer(CountMobx);
