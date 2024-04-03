import { Sprite, SpriteMaterial, TextureLoader } from "three";
import img from "@/assets/images/sprite.png";
import { type configType } from "@/views/assembly/earth/src/flyEarth/interface";

export default (config: configType) => {
	// TextureLoader创建一个纹理加载器对象，可以加载图片作为纹理贴图
	const textureLoader = new TextureLoader();
	const texture = textureLoader.load(img); // 加载纹理贴图
	// 创建精灵材质对象SpriteMaterial
	const spriteMaterial = new SpriteMaterial({
		color: config.spriteColor,
		map: texture, // 设置精灵纹理贴图
		transparent: true, // 开启透明
		opacity: 1, // 可以通过透明度整体调节光圈
		depthWrite: false
	});
	// 创建表示地球光圈的精灵模型
	const sprite = new Sprite(spriteMaterial);
	sprite.scale.set(config.R * 3.0, config.R * 3.0, 1); // 适当缩放精灵
	// sprite.scale.set(R*4.0, R*4.0, 1);//光圈相比较地球偏大
	return sprite;
};
