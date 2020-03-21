import React, { createElement } from "react";
import { Layout, Avatar, Typography, Menu, Row, Col } from "antd";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import { setSidebarStatus } from "./../../actions/status";
import { logout } from "./../../actions/user";

import scssVariables from "./../../styles/_variables.scss";
import styles from "./sidebar.module.scss";

const { Sider } = Layout;
const { Title, Text } = Typography;

const SideBar = ({ location, history }) => {
  const dispatch = useDispatch();

  const { imgSrc, name, email } = useSelector(state => state.user);
  const sidebar = useSelector(state => state.status.sidebar);

  const menu = [
    { path: "/", key: "home", name: "Home" },
    { path: "/history", key: "history", name: "History" },
    { path: "/protected", key: "protected", name: "Protected" }
  ];

  const onLogout = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <>
      <Sider
        width={scssVariables.sidebarWidth}
        theme="light"
        breakpoint="md"
        collapsed={!sidebar}
        collapsedWidth="0"
        trigger={null}
        className={styles.sider}
        onCollapse={collapsed => dispatch(setSidebarStatus(!collapsed))}
      >
        <Row className={[styles.headWrapper, "d-center mt-5"].join(" ")}>
          <Col span={7} className={"d-center"}>
            <Avatar size={64} src={imgSrc} icon={<UserOutlined />} />
          </Col>
          <Col>
            <Title level={3} style={{ margin: 0 }}>
              {name}
            </Title>
            <Text type="secondary">{email}</Text>
          </Col>
        </Row>

        <Menu
          mode="inline"
          defaultSelectedKeys={location.pathname.substring(1) || "home"}
          className="mt-5"
        >
          {menu.map(d => (
            <Menu.Item key={d.key} onClick={() => history.push(d.path)}>
              {d.name}
            </Menu.Item>
          ))}
          <Menu.Item key="logout" onClick={onLogout}>
            Logout
          </Menu.Item>
        </Menu>

        {/* sidebar toggler */}
        <div
          className={styles.toggler}
          onClick={() => dispatch(setSidebarStatus(!sidebar))}
        >
          {createElement(sidebar ? MenuFoldOutlined : MenuUnfoldOutlined, {
            className: styles.menuIcon
          })}
        </div>
      </Sider>

      {/* backDrop */}
      {sidebar && (
        <div
          className={styles.backDrop}
          onClick={() => dispatch(setSidebarStatus(false))}
        />
      )}
    </>
  );
};

export default SideBar;
