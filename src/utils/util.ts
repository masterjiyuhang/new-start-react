import { RouteObject } from "@/routers/interface";

/**
 * @description 获取需要展开的 subMenu
 * @param {String} path 当前访问地址
 * @returns {Array} 需要展开的 subMenu
 */
export const getOpenKeys = (path: string): Array<any> => {
	let newStr: string = "";
	let newArr: string[] = [];
	let arr = path.split("/").map(i => "/" + i);
	for (let i = 1; i < arr.length - 1; i++) {
		newStr += arr[i];
		newArr.push(newStr);
	}
	return newArr;
};

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @returns {string} 数据类型
 */
export const isType = (val: any): string => {
	if (val === null) return "null";
	if (typeof val !== "object") return typeof val;
	else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
};

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (path: string, routes: RouteObject[]): RouteObject | null => {
	let result: RouteObject | null = {};
	for (let item of routes) {
		if (item.path === path) return item;
		if (item.children) {
			const res = searchRoute(path, item.children);
			if (Object.keys(res as RouteObject).length) result = res;
		}
	}
	return result;
};

/**
 * @description 对象数组深克隆
 * @param {Object} obj 源对象
 * @returns {obj} 克隆后的对象
 */
export const deepCopy = <T>(obj: any): T => {
	let newObj: any;
	try {
		newObj = obj.push ? [] : {};
	} catch (error) {
		newObj = {};
	}
	for (let attr in obj) {
		if (typeof obj[attr] === "object") {
			newObj[attr] = deepCopy(obj[attr]);
		} else {
			newObj[attr] = obj[attr];
		}
	}
	return newObj;
};
