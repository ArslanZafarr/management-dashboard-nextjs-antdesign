"use client";
import React, { useEffect, useRef, useState } from "react";
import { Layout, Table, Button, Spin, Alert, Tooltip, Input } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/store/store";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Content } = Layout;
const { TextArea } = Input;

const Projects = () => {
  const router = useRouter();
  const [editingKey, setEditingKey] = useState("");

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
      editable: true,
      render: (text, record) => (
        <EditableCell
          value={text}
          record={record}
          editing={isEditing(record)}
          onSave={save}
          onCancel={cancel}
        />
      ),
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
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="link"
              icon={<EyeOutlined />}
              className="action-button"
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Save
            </Button>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              className="action-button"
              onClick={() => cancel()}
            >
              Cancel
            </Button>
          </span>
        ) : (
          <div className="flex justify-around">
            <Tooltip title="View">
              <Button
                type="text"
                shape="circle"
                icon={<EyeOutlined style={{ color: "#1890ff" }} />}
                className="action-button"
                onClick={() => handleView(record.id)}
              />
            </Tooltip>
            <Tooltip title="Edit">
              <Button
                type="text"
                shape="circle"
                icon={<EditOutlined style={{ color: "#52c41a" }} />}
                className="action-button"
                onClick={() => edit(record)}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                type="text"
                shape="circle"
                icon={<DeleteOutlined style={{ color: "#f5222d" }} />}
                className="action-button"
                onClick={() => handleDelete(record.id)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
  });

  const { projects, setProjects, deleteProject } = useAppStore();

  useEffect(() => {
    if (data) {
      setProjects(data);
    }
  }, [data, setProjects]);

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    setEditingKey(record.id);
  };

  const save = (id) => {
    const newData = [...projects];
    const index = newData.findIndex((item) => id === item.id);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item });
      setProjects(newData);
      setEditingKey("");
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const handleDelete = (projectId) => {
    deleteProject(projectId);
  };

  const handleView = (projectId) => {
    router.push(`/projects/${projectId}`);
  };

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
          dataSource={projects}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          bordered
        />

      </div>
    </Content>
  );
};

const EditableCell = ({ value, editing, onSave, onCancel, record }) => {
  const inputRef = useRef();

  const handlePressEnter = () => {
    onSave(record.id);
  };

  let childNode = value;

  childNode = (
    <Input
      ref={inputRef}
      onPressEnter={handlePressEnter}
      defaultValue={value}
    />
  );

  return <td>{childNode}</td>;
};

export default Projects;
