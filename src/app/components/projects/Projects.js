"use client";
import React from "react";
import { Layout, Table,  Button } from "antd";

const { Content } = Layout;

const columns = [
  {
    title: "Project Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <>
        <Button type="primary" ghost>
          View
        </Button>
        <Button type="primary" ghost>
          Edit
        </Button>
        <Button type="primary" danger ghost>
          Delete
        </Button>
      </>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "Project 1",
    description: "Description of Project 1",
  },
  {
    key: "2",
    name: "Project 2",
    description: "Description of Project 2",
  },
  {
    key: "3",
    name: "Project 3",
    description: "Description of Project 3",
  },
];

const Projects = () => {
  return (
    <Content className="p-4 bg-gray-100">
      <div className="py-4 px-20">
        <h1 className="text-3xl font-bold mb-4">Greetings!</h1>
        <h2 className="text-lg font-semibold mb-8">
          Welcome to the Dashboard Screen
        </h2>
        <Table columns={columns} dataSource={data} />
      </div>
    </Content>
  );
};

export default Projects;
