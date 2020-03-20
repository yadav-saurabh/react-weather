import React, { createElement } from "react";
import { Layout, Avatar, Typography, Menu, Row, Col } from "antd";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import { setSidebarStatus } from "./../../actions/status";

import scssVariables from "./../../styles/_variables.scss";
import styles from "./sidebar.module.scss";

const { Sider } = Layout;
const { Title, Text } = Typography;

const SideBar = () => {
  const dispatch = useDispatch();

  const { imgSrc, name, email } = useSelector(state => state.user);
  const sidebar = useSelector(state => state.status.sidebar);

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

        <Menu mode="inline" defaultSelectedKeys={["1"]} className="mt-5">
          <Menu.Item key="1">option1</Menu.Item>
          <Menu.Item key="2">option2</Menu.Item>
          <Menu.Item key="3">option3</Menu.Item>
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
