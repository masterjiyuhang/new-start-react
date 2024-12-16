import { useEffect } from "react";
import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import LayoutMenu from "./components/Menu";
import LayoutHeader from "./components/Header";
import LayoutTabs from "./components/Tabs";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import LayoutFooter from "./components/Footer";
import "./index.scss";
import { connect } from "react-redux";
import { updateCollapse } from "@/redux/modules/menu/action";
import { setAuthButtons } from "@/redux/modules/auth/action";
import { getAuthorButtons } from "@/api/modules/login";

const LayoutIndex = (props: any) => {
	const { Sider, Content } = Layout;
	const { isCollapse } = props;
	const { pathname } = useLocation();
	const { setAuthButtons } = props;

	// 获取按钮权限列表
	const getAuthButtonsData = async () => {
		const { data } = await getAuthorButtons();
		setAuthButtons(data);
	};

	// 监听窗口大小变化
	const listeningWindow = () => {
		window.onresize = () => {
			(() => {
				let screenWidth = document.body.clientWidth;
				if (props.isCollapse === false && screenWidth < 1200) props.updateCollapse(true);
				if (props.isCollapse === false && screenWidth > 1200) props.updateCollapse(false);
			})();
		};
	};

	useEffect(() => {
		listeningWindow();
		getAuthButtonsData();
	}, []);
	return (
		// 这里不用 Layout 组件原因是切换页面时样式会先错乱在正常，造成闪屏效果
		<section className="layout-container">
			<Sider trigger={null} collapsed={isCollapse} width={220} theme="dark">
				<LayoutMenu></LayoutMenu>
			</Sider>
			<Layout>
				<LayoutHeader></LayoutHeader>
				<LayoutTabs></LayoutTabs>
				<Content>
					<TransitionGroup className="min-h-screen overflow-y-scroll content">
						{/* exit：表示退出当前页面的时候是否有动画 */}
						<CSSTransition key={pathname} timeout={200} classNames="fade" exit={false}>
							<Outlet></Outlet>
						</CSSTransition>
					</TransitionGroup>
				</Content>
				<LayoutFooter></LayoutFooter>
			</Layout>
		</section>
	);
};

// export default LayoutIndex;
// * react-redux写法(高阶组件)
// * connect具有两个参数，第一个参数是mapStateToProps，第二个参数是mapDispatchToProps
const mapDispatchToProps = { updateCollapse, setAuthButtons };
const mapStateToProps = (state: any) => state.menu;
export default connect(mapStateToProps, mapDispatchToProps)(LayoutIndex);
