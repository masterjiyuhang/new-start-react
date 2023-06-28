import { routerArray } from "@/routers";
import { LayoutTitleContext } from "@/routers/constant";
import { searchRoute } from "@/utils/util";
import { Breadcrumb } from "antd";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

const BreadcrumbNav = () => {
	const { pathname } = useLocation();
	// console.log(pathname, "breadcrumb path");

	const route = searchRoute(pathname, routerArray);
	// console.log(route, "breadcrumb route");

	const props: { title?: string } = useContext(LayoutTitleContext);
	let breadcrumbList: any[] = [];
	if (props!.title) breadcrumbList = [props!.title, route?.meta!.title];
	else breadcrumbList = [route?.meta!.title];

	console.log(breadcrumbList, "breadcrumb list");
	return (
		<Breadcrumb>
			<Breadcrumb.Item>Home</Breadcrumb.Item>
			<Breadcrumb.Item>List</Breadcrumb.Item>
			<Breadcrumb.Item>App</Breadcrumb.Item>
		</Breadcrumb>
	);
};

export default BreadcrumbNav;
