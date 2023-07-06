import { configType, Options } from "@/views/assembly/earth/src/flyEarth/interface";
import { merge } from "lodash-es";
class Store {
	mode: "2d" | "3d" = "3d";
	config: configType = {
		R: 320,
		earth: {
			color: "#f80"
		},
		map: "world",
		texture: "",
		mapStyle: {
			areaColor: "#f80",
			lineColor: "#f80"
		},
		spriteColor: "#f80", //光圈
		pathStyle: {
			color: "#f80" //飞线路径配置
		},
		flyWireStyle: {
			//飞线样式配置
			color: "#f80"
		},
		scatterStyle: {
			//涟漪
			color: "#f80"
		}
	};
	//存储以存在的飞线
	flyLineMap: Record<any, true> = {};
	setConfig(options: Partial<Options>) {
		this.mode = options.mode || "3d";
		merge(this.config, options.config);
	}
	getConfig(): configType {
		return this.config;
	}
}
export default Store;
