"use client";
import React, { useState } from "react";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Avatar, Dropdown, Menu } from "antd";

const { Header, Content } = Layout;

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      // Handle logout action
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="bg-white shadow flex items-center justify-between px-20 bg-gray-100">
    <div className="text-lg font-semibold">Management Dashboard</div>
    <div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    </div>
  </Header>
   
  );
};

export default Navbar;
