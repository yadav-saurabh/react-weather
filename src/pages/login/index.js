import React, { useState } from "react";
import { Form, Input, Button, Card, Spin, Alert, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";

import styles from "./login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "../../actions/status";
import { requestLogin } from "../../actions/user";

const Login = ({ history, location }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isLogged = useSelector(state => state.status.isLogged);

  const from = location.state?.from || { pathname: "/" };
  const dispatch = useDispatch();

  // redirect to home if already loggedin
  if (isLogged) {
    return <Redirect to={from} />;
  }

  const onFinish = async values => {
    setLoading(true);
    setError("");

    const { error } = await dispatch(requestLogin(values));
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    dispatch(setLoginStatus(true));
    // redirect to the referral private route if tried to acces bedore logged in or to home
    history.push(from.pathname);
  };

  return (
    <Layout className={[styles.container, "d-center"].join(" ")}>
      <Card className={styles.card}>
        <Form
          name="login"
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
        >
          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              closable
              onClose={() => setError("")}
            />
          )}
          <Form.Item
            name="email"
            label="Email"
            type="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item className={styles.btnCtn}>
            <Spin spinning={loading}>
              <Button className={styles.btn} type="primary" htmlType="submit">
                Log in
              </Button>
            </Spin>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default Login;
