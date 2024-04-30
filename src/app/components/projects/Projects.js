"use client";
import React from "react";
import { Layout, Table, Button, Spin, Alert, Tooltip } from "antd";
import { useQuery } from "@tanstack/react-query";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Content } = Layout;

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "center",
    width: 100,
  },
  {
    title: "Project",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Completed",
    dataIndex: "completed",
    key: "completed",
    render: (completed) => (completed ? "Yes" : "No"),
    align: "center",
    width: 160,
  },
  {
    title: "Actions",
    key: "actions",
    align: "center",
    width: 140,
    render: () => (
      <div className="flex justify-around">
        <Tooltip title="View">
          <Button
            type="text"
            shape="circle"
            icon={<EyeOutlined style={{ color: "#1890ff" }} />}
            className="action-button"
          />
        </Tooltip>
        <Tooltip title="Edit">
          <Button
            type="text"
            shape="circle"
            icon={<EditOutlined style={{ color: "#52c41a" }} />}
            className="action-button"
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            type="text"
            shape="circle"
            icon={<DeleteOutlined style={{ color: "#f5222d" }} />}
            className="action-button"
          />
        </Tooltip>
      </div>
    ),
  },
];

const Projects = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
  });

  if (isLoading) {
    return (
      <Content className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </Content>
    );
  }

  if (isError) {
    return (
      <Content className="flex justify-center items-center h-screen">
        <Alert message="Error fetching data" type="error" />
      </Content>
    );
  }

  return (
    <Content className="p-4 bg-gray-100">
      <div className="py-4 px-20">
        <h1 className="text-3xl font-bold text-center mb-4">Projects Table</h1>
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          bordered
        />
      </div>
    </Content>
  );
};

export default Projects;
