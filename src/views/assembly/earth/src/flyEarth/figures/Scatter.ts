import pointImg from "@/assets/images/point.png";
import scatterImg from "@/assets/images/scatter.png";
import { lon2xyz } from "../utils/math";
import { type configType, type Coordinates, type ScatterStyle } from "@/views/assembly/earth/src/flyEarth/interface";
import { setTween } from "@/views/assembly/earth/src/flyEarth/utils/tween";
import { Group, Mesh, MeshBasicMaterial, PlaneGeometry, TextureLoader, Vector3 } from "three";
import type Store from "@/views/assembly/earth/src/flyEarth/store/store";

export default class Scatter {
	private readonly _config: configType;
	private readonly _store: Store;
	customStyle: ScatterStyle;
	constructor(store: Store) {
		this._config = store.getConfig();
		this._store = store;
		this.customStyle = this._config.scatterStyle as ScatterStyle;
	}

	setMeshAttr(geometry: PlaneGeometry, material: MeshBasicMaterial, { lon, lat, ...rest }: Coordinates) {
		const mesh = new Mesh(geometry, material);
		const zOffset = material.name === "scatter" ? this._config.R * 1.001 : this._config.R * 1.002;
		const size = this._config.R * 0.05;
		mesh.scale.set(size * 1.3, size * 1.3, size * 1.3);
		if (this._store.mode === "3d") {
			const { x, y, z } = lon2xyz(zOffset, lon, lat);
			mesh.position.set(x, y, z); // 设置mesh位置
			const meshNormal = new Vector3(0, 0, 1);
			const coordVec3 = new Vector3(x, y, z).normalize();
			mesh.quaternion.setFromUnitVectors(meshNormal, coordVec3);
		} else {
			mesh.position.set(lon, lat, 0.1);
		}

		mesh.userData = rest;
		return { mesh, size };
	}

	createScatterMesh = (data: Coordinates) => {
		const { geometry, material } = this.createScatter();
		const { mesh, size } = this.setMeshAttr(geometry, material, data);
		mesh.name = "scatter";
		// 设置动画
		setTween({ size: size * 1.5, opacity: 0 }, { size: [size * 2.8, size * 3.5], opacity: [1, 0.1] }, function (params: any) {
			mesh.scale.set(params.size, params.size, params.size);
			mesh.material.opacity = params.opacity;
		});
		return mesh;
	};

	createScatter() {
		const geometry = new PlaneGeometry(1, 1);
		const textureLoader = new TextureLoader().load(scatterImg);
		const material = new MeshBasicMaterial({
			map: textureLoader,
			transparent: true,
			color: this.customStyle ? this.customStyle.color : this._config.scatterStyle.color,
			opacity: 1.0,
			// side: DoubleSide, //双面可见
			depthWrite: false // 禁止写入深度缓冲区数据
		});
		material.name = "scatter";
		return { geometry, material };
	}

	createPointMesh = (data: Coordinates) => {
		const { geometry, material } = this.createPoint();
		const { mesh } = this.setMeshAttr(geometry, material, data);
		mesh.name = "point";
		return mesh;
	};

	createPoint() {
		const geometry = new PlaneGeometry(1, 1);
		const textureLoader = new TextureLoader().load(pointImg);
		const material = new MeshBasicMaterial({
			map: textureLoader,
			transparent: true,
			color: this.customStyle ? this.customStyle.color : this._config.scatterStyle.color
		});
		material.name = "point";

		return { geometry, material };
	}

	create(data: Coordinates) {
		if (data.style) {
			this.customStyle = data.style;
		}
		const group = new Group();
		const point = this.createPointMesh(data);
		const scatter = this.createScatterMesh(data);
		point.userData = { ...data };
		scatter.userData = { ...data };
		group.name = "pointScatter";
		group.add(point, scatter);
		return group;
	}
}
