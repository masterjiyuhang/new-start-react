import Layout from "@/layouts/index";
import { createContext } from "react";
// import AuthRouter from "@/routers/utils/authRouter";

export const LayoutTitleContext = createContext({});

export const { Provider, Consumer } = LayoutTitleContext;

export const LayoutIndex = (props: { title?: string } = {}) => {
	return (
		// <AuthRouter>
		<Provider value={props}>
			<Layout />
		</Provider>
		// </AuthRouter>
	);
};
