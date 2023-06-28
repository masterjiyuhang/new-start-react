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

const { Sider, Content } = Layout;

const LayoutIndex = (props: any) => {
	const { isCollapse } = props;
	const { pathname } = useLocation();
	return (
		<section className="container">
			<Sider trigger={null} collapsed={isCollapse} width={220} theme="dark">
				<LayoutMenu></LayoutMenu>
			</Sider>
			<Layout>
				<LayoutHeader></LayoutHeader>
				<LayoutTabs></LayoutTabs>
				<Content>
					<TransitionGroup className="content">
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
const mapDispatchToProps = { updateCollapse };
const mapStateToProps = (state: any) => state.menu;
export default connect(mapStateToProps, mapDispatchToProps)(LayoutIndex);
