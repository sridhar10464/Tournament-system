import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="home">
        <Link to = "/">Home</Link>
      </Menu.Item>
      <Menu.Item key="create">
        <Link to ="/create">Create Tournament</Link>
      </Menu.Item>
      <Menu.Item key="register">
        <Link to = "/register">Register Tournament</Link>
      </Menu.Item>
      <Menu.Item key="schedule">
        <Link to = "/schedule">Schedule Tournament</Link>
      </Menu.Item>
      <Menu.Item key="result">
        <Link to = "/result">Result Tournament</Link>
      </Menu.Item>
      <Menu.Item key="view-tournaments">
        <Link to = "/tournaments-list">Tournaments List</Link>
      </Menu.Item>
      <Menu.Item key="participants">
        <Link to = "/participant">Participants-CRUD</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
