import React, { useEffect, useRef } from "react";
import "./index.scss";
import chart from "@/views/assembly/earth/src/flyEarth/index";
import ChartScene from "@/views/assembly/earth/src/flyEarth/chartScene";
import worldTexture from "@/assets/images/earth.png";
import { initData } from "./src/contants";

const index = () => {
	const earthRef = useRef<HTMLDivElement>(null);
	let chartInstance: ChartScene;

	useEffect(() => {
		console.log(earthRef.current);
		const dom = earthRef.current as HTMLDivElement;

		chartInstance = chart.init({
			dom,
			helper: false,
			map: "world",
			autoRotate: true,
			rotateSpeed: 0.0039,
			mode: "3d",
			light: "AmbientLight",
			config: {
				R: 140,
				texture: worldTexture,
				earth: {
					color: "#f00"
				},
				mapStyle: {
					areaColor: "#2e3564",
					lineColor: "#797eff"
				},
				spriteColor: "#B0C4DE", //光圈
				pathStyle: {
					color: "#6495ED" //飞线路径配置
				},
				flyWireStyle: {
					//飞线样式配置
					color: "#4169E1"
				},
				scatterStyle: {
					//涟漪
					color: "#00BFFF"
				}
			}
		});

		chartInstance.setData("flyLine", initData);

		chartInstance.on("mouseover", () => {
			console.log("鼠标滑过的时候触发了应该");
			chartInstance.options.autoRotate = false;
		});
		chartInstance.on("mouseout", () => {
			chartInstance.options.autoRotate = true;
		});
	}, []);
	return (
		<div className="content-box">
			<div id="container" ref={earthRef}></div>
		</div>
	);
};

export default index;
