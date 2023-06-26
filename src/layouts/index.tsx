import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import LayoutMenu from "./components/Menu";
import LayoutHeader from "./components/Header";
import LayoutTabs from "./components/Tabs";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import LayoutFooter from "./components/Footer";
import "./index.scss";

const { Sider, Content } = Layout;

const LayoutIndex = () => {
	const { pathname } = useLocation();
	return (
		<section className="container">
			<Sider trigger={null} collapsible collapsed={false}>
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

export default LayoutIndex;
