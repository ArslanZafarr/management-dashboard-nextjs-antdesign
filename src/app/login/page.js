"use client";
import { Button, Form, Input, message } from "antd";
import React, { useMemo } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const correctUsername = "admin";
  const correctPassword = "admin";

  // Set cookie with an expiration time of 14 days
  const expirationTime = 14 * 24 * 60 * 60; // 14 days in seconds
  const currentTime = new Date().getTime() / 1000; // Convert milliseconds to seconds
  const expirationDate = useMemo(() => {
    return new Date((currentTime + expirationTime) * 1000);
  }, [currentTime, expirationTime]);

  const onFinish = (values) => {
    const { username, password } = values;
    if (username === correctUsername && password === correctPassword) {
      message.success("User logged in successfully");

      Cookies.set("user", JSON.stringify(values), {
        expires: expirationDate,
      });

      router.push("/");
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

export default Page;
