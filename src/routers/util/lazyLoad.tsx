import { Spin } from "antd";
import React, { Suspense } from "react";

/**
 * @description 路由懒加载
 * @param {Element} Comp 需要访问的组件
 * @returns element
 */
export default function lazyLoad(Comp: React.LazyExoticComponent<any>): React.ReactNode {
	return (
		<Suspense
			fallback={
				<Spin
					size="large"
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100%"
					}}
				></Spin>
			}
		>
			<Comp></Comp>
		</Suspense>
	);
}
