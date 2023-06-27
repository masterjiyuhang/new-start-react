import { Table } from "antd";
import React from "react";

const UseHooks = () => {
	const dataSource = [
		{
			key: "1",
			name: "河南吴彦祖",
			age: 32,
			address: "西湖区湖底公园1号"
		},
		{
			key: "2",
			name: "广西周润发",
			age: 42,
			address: "西湖区湖底公园1号"
		}
	];
	const columns = [
		{
			title: "name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "age",
			dataIndex: "age",
			key: "age"
		},
		{
			title: "address",
			dataIndex: "address",
			key: "address"
		}
	];
	return <Table dataSource={dataSource} columns={columns}></Table>;
};

export default UseHooks;
