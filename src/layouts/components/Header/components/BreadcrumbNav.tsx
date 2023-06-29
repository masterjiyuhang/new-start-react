import { HOME_URL } from "@/config/config";
import { Breadcrumb } from "antd";
// import { routerArray } from "@/routers";
// import { getBreadcrumbList } from "@/utils/util";
// import { LayoutTitleContext } from "@/routers/constant";
// import { useContext } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

const BreadcrumbNav = (props: any) => {
	const { pathname } = useLocation();

	const res: Array<any> = props.breadcrumbList[pathname]
		? props.breadcrumbList[pathname].map((item: any) => {
				return { title: item };
		  })
		: [];
	if (pathname !== HOME_URL) {
		res.unshift({ title: "首页啊啊", href: `#${HOME_URL}` });
	}
	const breadcrumbList = res || [];

	return <Breadcrumb items={breadcrumbList} />;
};

const mapStateToProps = (state: any) => state.breadcrumbReducer;
export default connect(mapStateToProps)(BreadcrumbNav);
