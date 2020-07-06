import React from "react";
import { Form, Input, Button, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./login.css";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import api from "../../utils/api";

const LoginPage = () => {
  let history = useHistory();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // history.push('/dasboard')
    api('user/login','POST',{user_no: values.user_no, user_pwd: values.user_pwd}).then(res=>console.log(res))
  };

  return (
    <Layout style={{ background: "#fff" }} className="content">
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="user_no"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="user_pwd"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default LoginPage;
