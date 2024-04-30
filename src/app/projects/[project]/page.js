"use client";
import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  Tag,
  Avatar,
  Modal,
  Input,
  Select,
  Button,
  DatePicker,
  Form,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const Page = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState(null);
  const [teamMemberFilter, setTeamMemberFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // Dummy data
      const dummyData = [
        {
          id: 1,
          taskName: "Push Notification Implementation",
          assigneeTeam: ["Usama", "Arslan"],
          taskStatus: "To-Do",
          assignDate: "2024-05-01",
          deadline: "2024-05-10",
          description: "Implement push notifications for the mobile app.",
        },
        {
          id: 2,
          taskName: "Alpha Payment Gateway Integration",
          assigneeTeam: ["Usama", "Haris"],
          taskStatus: "In-Progress",
          assignDate: "2024-04-25",
          deadline: "2024-05-05",
          description: "Integrate Alpha payment gateway for online payments.",
        },
      ];
      setData(dummyData);
      setFilteredData(dummyData);
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Task Name",
      dataIndex: "taskName",
      key: "taskName",
    },
    {
      title: "Assignee Team",
      dataIndex: "assigneeTeam",
      key: "assigneeTeam",
      render: (assigneeTeam) => (
        <div className="flex">
          {assigneeTeam.map((member, index) => (
            <Avatar key={index} className="mr-2">
              {member}
            </Avatar>
          ))}
        </div>
      ),
    },
    {
      title: "Task Status",
      dataIndex: "taskStatus",
      key: "taskStatus",
      render: (status) => (
        <Tag
          color={
            status === "To-Do"
              ? "orange"
              : status === "In-Progress"
              ? "blue"
              : "green"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Assign Date",
      dataIndex: "assignDate",
      key: "assignDate",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <a onClick={() => handleViewDetails(record)}>View Details</a>
      ),
    },
  ];

  const handleViewDetails = (record) => {
    console.log("View details:", record);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
    const newTask = {
      id: data.length + 1,
      taskName: values.taskTitle,
      assigneeTeam: values.assigneeTeam,
      taskStatus: values.taskStatus,
      assignDate: values.dateRange[0].format("YYYY-MM-DD"),
      deadline: values.dateRange[1].format("YYYY-MM-DD"),
      description: values.taskDescription,
    };
    const newData = [...data, newTask];
    setData(newData);
    setFilteredData(newData);
    message.success("Task added successfully");
    setVisible(false);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    const newData = data.filter((task) =>
      task.taskName.toLowerCase().includes(value.toLowerCase())
    );
    applyFilters(newData, filterValue, teamMemberFilter);
  };

  const handleFilter = (value) => {
    setFilterValue(value);
    applyFilters(data, value, teamMemberFilter);
  };

  const handleTeamMemberFilter = (value) => {
    setTeamMemberFilter(value);
    applyFilters(data, filterValue, value);
  };

  const applyFilters = (data, statusFilter, teamMemberFilter) => {
    let newData = [...data];

    if (statusFilter) {
      newData = newData.filter((task) => task.taskStatus === statusFilter);
    }

    if (teamMemberFilter) {
      newData = newData.filter((task) =>
        task.assigneeTeam.includes(teamMemberFilter)
      );
    }

    setFilteredData(newData);
  };

  return (
    <Content className="p-4 bg-gray-100">
      <div className="py-4 px-20">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-bold">Task Management System</h1>
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            Add New Task
          </Button>
        </div>
        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Search Task"
            style={{ width: 200 }}
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Select
            style={{ width: 150 }}
            placeholder="Filter Status"
            allowClear
            value={filterValue}
            onChange={handleFilter}
          >
            <Option value="">All</Option>
            <Option value="To-Do">To-Do</Option>
            <Option value="In-Progress">In-Progress</Option>
            <Option value="Done">Done</Option>
            <Option value="Review">Review</Option>
          </Select>
          <Select
            style={{ width: 200 }}
            placeholder="Filter Team Member"
            allowClear
            value={teamMemberFilter}
            onChange={handleTeamMemberFilter}
          >
            {data
              .flatMap((task) => task.assigneeTeam)
              .map((member) => (
                <Option key={member} value={member}>
                  {member}
                </Option>
              ))}
          </Select>
        </div>
        <Table columns={columns} dataSource={filteredData} pagination={false} />

        <Modal
          title="Add New Task"
          visible={visible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="taskTitle"
              label="Task Title"
              rules={[{ required: true, message: "Please enter task title" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="taskDescription"
              label="Task Description"
              rules={[
                { required: true, message: "Please enter task description" },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="assigneeTeam"
              label="Assignee Team"
              rules={[
                { required: true, message: "Please select assignee team" },
              ]}
            >
              <Select mode="multiple">
                <Option value="Usama">Usama</Option>
                <Option value="Arslan">Arslan</Option>
                <Option value="Haris">Haris</Option>
                <Option value="Haroon">Haroon</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="taskStatus"
              label="Task Status"
              rules={[{ required: true, message: "Please select task status" }]}
            >
              <Select>
                <Option value="To-Do">To-Do</Option>
                <Option value="In-Progress">In-Progress</Option>
                <Option value="Done">Done</Option>
                <Option value="Review">Review</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="dateRange"
              label="Date Range"
              rules={[{ required: true, message: "Please select date range" }]}
            >
              <RangePicker />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Content>
  );
};

export default Page;
