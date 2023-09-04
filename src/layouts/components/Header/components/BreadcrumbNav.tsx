import { HOME_URL } from "@/config/config";
import { RootState, useSelector } from "@/redux-toolkit";
import { Breadcrumb } from "antd";
// import { routerArray } from "@/routers";
// import { getBreadcrumbList } from "@/utils/util";
// import { LayoutTitleContext } from "@/routers/constant";
// import { useContext } from "react";
// import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

const BreadcrumbNav = () => {
	const { pathname } = useLocation();
	// const { themeConfig } = props.globalReducer;
	// const { breadcrumbList } = props.breadcrumbReducer;
	// const { breadcrumb: isShowBreadCrumb } = themeConfig;

	const { themeConfig } = useSelector((state: RootState) => state.global);
	const { breadcrumb: isShowBreadCrumb } = themeConfig;
	const { breadcrumbList } = useSelector((state: RootState) => state.breadcrumb);

	const res: Array<any> = breadcrumbList[pathname]
		? breadcrumbList[pathname].map((item: any) => {
				return { title: item };
		  })
		: [];
	if (pathname !== HOME_URL) {
		res.unshift({ title: "首页啊啊", href: `#${HOME_URL}` });
	}
	const breadcrumbItems = res || [];

	return <>{isShowBreadCrumb && <Breadcrumb items={breadcrumbItems} />}</>;
};

// const mapStateToProps = (state: any) => state;
// export default connect(mapStateToProps)(BreadcrumbNav);
export default BreadcrumbNav;
