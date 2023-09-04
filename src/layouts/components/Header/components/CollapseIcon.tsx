import { RootState, useDispatch, useSelector } from "@/redux-toolkit";
import { updateCollapse } from "@/redux-toolkit/reducer/menu";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
// import { connect } from "react-redux";
// import { updateCollapse } from "@/redux/modules/menu/action";

const CollapseIcon = () => {
	const { isCollapse } = useSelector((state: RootState) => state.menu);

	const dispatch = useDispatch();

	return (
		<div
			className="collapsed"
			onClick={() => {
				dispatch(updateCollapse(!isCollapse));
			}}
		>
			{isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
		</div>
	);
};

// const mapDispatchToProps = { updateCollapse };
// const mapStateToProps = (state: any) => state.menu;
// export default connect(mapStateToProps, mapDispatchToProps)(CollapseIcon);
export default CollapseIcon;
