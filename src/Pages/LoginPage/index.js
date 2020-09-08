import React from "react";
import { Form, Input, Button, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./login.css";
import { useHistory } from "react-router-dom";
import api from "../../utils/api";

const LoginPage = () => {
  let history = useHistory();
  const onFinish = (values) => {
    var bodyFormData = new FormData();
    bodyFormData.append("user_no", values.user_no);
    bodyFormData.append("user_pwd", values.user_pwd);
    api("user/login", "POST", bodyFormData).then((res) => {
      localStorage.setItem("BRANCH_ID", res.data.data.BRANCH_ID);
      localStorage.setItem("INPUT_USER", res.data.data.INPUT_USER);
      localStorage.setItem("USER_NO", res.data.data.USER_NO);
      history.push("/dasboard");
    });
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
