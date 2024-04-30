"use client";
import { Button, Form, Input, message } from "antd";
import React from "react";

const page = () => {
  const correctUsername = "admin";
  const correctPassword = "admin";

  const onFinish = (values) => {
    const { username, password } = values;
    if (username === correctUsername && password === correctPassword) {
      message.success("User logged in successfully");
    } else {
      message.error("Incorrect username or password");
    }
  };

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <Form onFinish={onFinish} className="space-y-4">
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-8 p-4 bg-gray-200 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold mb-4">User Info</h2>
          <div className="text-gray-600">
            <p>
              <span className="font-semibold">Username:</span> admin
            </p>
            <p>
              <span className="font-semibold">Password:</span> admin
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
