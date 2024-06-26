import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import axios, { type AxiosInstance, type AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { AxiosCanceler } from "./helper/axiosCancel";
import { useNavigate } from "react-router-dom";
import { ResultEnum } from "@/enums/httpEnum";
import { message } from "antd";
import { checkStatus } from "./helper/checkStatus";
import { type ResultData } from "./interface";
import { store } from "@/redux";
import NProgress from "@/utils/nprogress";
import { setToken } from "@/redux/modules/global/action";

const axiosCanceler = new AxiosCanceler();

const navigateTo = (path: string) => {
	const navigate = useNavigate();
	navigate(path);
};

class RequestHttp {
	service: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		// 实例化axios
		this.service = axios.create(config);

		/**
		 * @description 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的token,存储到redux/本地储存当中
		 */
		this.service.interceptors.request.use(
			(config: AxiosRequestConfig | any) => {
				NProgress.start();
				// * 将当前请求添加到 pending 中
				axiosCanceler.addPending(config);
				// * 如果当前请求不需要显示 loading,在api服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
				config.headers!.noLoading || showFullScreenLoading();
				const token: string = store.getState().globalReducer.token;
				// const token: string = "123456";
				// return { ...config, headers: { "x-access-token": token } };
				return { ...config, headers: { ...config.headers, "x-access-token": token } };
			},
			async (error: AxiosError) => {
				return await Promise.reject(error);
			}
		);

		/**
		 * @description 响应拦截器
		 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */

		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data, config } = response;
				NProgress.done();
				// * 在请求结束后，移除本次请求(关闭loading)
				axiosCanceler.removePending(config);
				tryHideFullScreenLoading();
				// * 登录失效（code == 599）
				if (data.code === ResultEnum.OVERDUE) {
					store.dispatch(setToken(""));
					message.error(data.msg);
					navigateTo("/login");
					const error = new Error(data.msg);
					return Promise.reject(error);
				}
				// * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
				if (data.code && data.code !== ResultEnum.SUCCESS) {
					message.error(data.msg);
					const error = new Error(data.msg);
					return Promise.reject(error);
				}
				// * 成功请求
				return data;
			},
			async (error: AxiosError) => {
				const { response } = error;
				// const navigate = useNavigate();
				NProgress.done();
				tryHideFullScreenLoading();
				// 根据响应的错误状态码，做不同的处理
				if (response) checkStatus(response.status);
				// 服务器结果都没有返回(可能服务器错误可能客户端断网) 断网处理:可以跳转到断网页面
				if (!window.navigator.onLine) navigateTo("/500");
				return await Promise.reject(error);
			}
		);
	}

	// * 常用请求方法封装
	async get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return await this.service.get(url, { params, ..._object });
	}

	async post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return await this.service.post(url, params, _object);
	}

	async put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return await this.service.put(url, params, _object);
	}

	async delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return await this.service.delete(url, { params, ..._object });
	}
}

const config = {
	// 默认地址
	baseURL: import.meta.env.VITE_API_URL as string,
	// 设置超时时间（10s）
	timeout: 10000,
	// 跨域时候允许携带凭证
	withCredentials: true
};
export default new RequestHttp(config);
