import { type ResPage, type User } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";

import http from "@/api";

/**
 * @name 用户管理模块
 */
// * 获取用户列表
export const getUserList = async (params: Partial<User.ReqGetUserParams>) => {
	return await http.post<ResPage<User.ResUserList>>(PORT1 + `/user/list`, params);
};

// * 新增用户
export const addUser = async (params: { id: string }) => {
	return await http.post(PORT1 + `/user/add`, params);
};

// * 批量添加用户
export const BatchAddUser = async (params: any) => {
	return await http.post(PORT1 + `/user/import`, params, { headers: { "Content-Type": "multipart/form-data" } });
};

// * 编辑用户
export const editUser = async (params: { id: string }) => {
	return await http.post(PORT1 + `/user/edit`, params);
};

// * 删除用户
export const deleteUser = async (params: { id: string[] }) => {
	return await http.post(PORT1 + `/user/delete`, params);
};

// * 切换用户状态
export const changeUserStatus = async (params: { id: string; status: number }) => {
	return await http.post(PORT1 + `/user/change`, params);
};

// * 重置用户密码
export const resetUserPassWord = async (params: { id: string }) => {
	return await http.post(PORT1 + `/user/rest_password`, params);
};

// * 导出用户数据
export const exportUserInfo = async (params: User.ReqGetUserParams) => {
	return await http.post<BlobPart>(PORT1 + `/user/export`, params, { responseType: "blob" });
};
