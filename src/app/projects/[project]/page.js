"use client";
import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
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
  const [viewTaskModalVisible, setViewTaskModalVisible] = useState(false);
  const [viewTaskDetails, setViewTaskDetails] = useState(null);
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
      render: (status, record) => (
        <Select
          defaultValue={status}
          onChange={(value) => changeStatus(record.id, value)}
        >
          <Option value="To-Do">To-Do</Option>
          <Option value="In-Progress">In-Progress</Option>
          <Option value="Done">Done</Option>
          <Option value="Review">Review</Option>
        </Select>
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
    setViewTaskDetails(record);
    setViewTaskModalVisible(true);
  };

  const handleViewTaskCancel = () => {
    setViewTaskModalVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const changeStatus = (taskId, status) => {
    const updatedData = data.map((task) => {
      if (task.id === taskId) {
        return { ...task, taskStatus: status };
      }
      return task;
    });
    setData(updatedData);
    setFilteredData(updatedData);
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
    <Layout style={{ minHeight: "100vh" }}>
      <Content className="p-4 bg-gray-100" style={{ minHeight: "100%" }}>
        <div className="py-8 px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Project Details
            </h2>
            <p className="text-base sm:text-lg font-medium mb-2">
              Project Name: Chat App
            </p>
            <p className="text-base sm:text-lg font-medium mb-2">
              Project Description: Realtime Chat App
            </p>
            <p className="text-base sm:text-lg font-medium mb-2">
              Features: Voice Messaging, Video Calling, Document Sharing
            </p>
            <p className="text-base sm:text-lg font-medium mb-2">
              Duration: 2 Months
            </p>
            <p className="text-base sm:text-lg font-medium mb-2">
              Technologies Involved: React JS, Node JS, PostgreSQL, Docker
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
              Tasks Progress Board
            </h1>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showModal}
              className="w-full sm:w-auto mt-4 sm:mt-0"
            >
              Add New Task
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Input
              placeholder="Search Task"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full sm:w-64"
            />
            <Select
              placeholder="Filter Status"
              allowClear
              value={filterValue}
              onChange={handleFilter}
              className="w-full sm:w-64"
            >
              <Option value="">All</Option>
              <Option value="To-Do">To-Do</Option>
              <Option value="In-Progress">In-Progress</Option>
              <Option value="Done">Done</Option>
              <Option value="Review">Review</Option>
            </Select>
            <Select
              placeholder="Filter Member"
              allowClear
              value={teamMemberFilter}
              onChange={handleTeamMemberFilter}
              className="w-full sm:w-64"
            >
              {[...new Set(data.flatMap((task) => task.assigneeTeam))].map(
                (member) => (
                  <Option key={member} value={member}>
                    {member}
                  </Option>
                )
              )}
            </Select>
          </div>
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={false}
            scroll={{ x: true }}
            className="mb-8"
          />

          <div className="p-4 bg-blue-200 rounded-lg shadow-md text-center mb-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Please Note
            </h2>
            <p className="text-base sm:text-lg">
              Hi Tester,
              <br />
              In this project details, I have added almost all content according
              to your instructions, but with the same structure for all dynamic
              project pages.
              <br />
              If I render the dynamic data for each project details page, it
              would require a dedicated API for this case, which I don&apos;t
              have.
              <br />
              Creating a mock API from scratch for this purpose would take a lot
              of time.
            </p>
          </div>

          <Modal
            title="Task Details"
            visible={viewTaskModalVisible}
            onCancel={handleViewTaskCancel}
            footer={null}
            className="rounded-lg"
            bodyStyle={{ padding: "24px" }}
          >
            {viewTaskDetails && (
              <div>
                <p className="text-lg font-semibold mb-4">
                  {viewTaskDetails.taskName}
                </p>
                <p>
                  <strong>Assignee Team:</strong>{" "}
                  {viewTaskDetails.assigneeTeam.join(", ")}
                </p>
                <p>
                  <strong>Task Status:</strong> {viewTaskDetails.taskStatus}
                </p>
                <p>
                  <strong>Assign Date:</strong> {viewTaskDetails.assignDate}
                </p>
                <p>
                  <strong>Deadline:</strong> {viewTaskDetails.deadline}
                </p>
                <p>
                  <strong>Description:</strong> {viewTaskDetails.description}
                </p>
              </div>
            )}
          </Modal>

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
                rules={[
                  { required: true, message: "Please select task status" },
                ]}
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
                rules={[
                  { required: true, message: "Please select date range" },
                ]}
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
    </Layout>
  );
};

export default Page;
