import React from "react";
import { Typography, Form, Button, Row, Col, Select } from "antd";
import { useSelector } from "react-redux";

const { Title } = Typography;

const { Option } = Select;

export default function InPhieuTheoDoi() {
  const dropdown = useSelector((state) => state.dropdown);

  function onFinish(values) {
    window.open(
      `https://job-api.ihtvn.com/api/v1/print/file/job-start/fromjob=${values.JOB_NO}&tojob=${values.JOB_NO2}`
    );
  }
  return (
    <>
      <Title level={4} style={{ color: "red" }}>
        In Phiếu Theo Dõi
      </Title>
      <Form onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={10}>
            <Form.Item label="From" name="JOB_NO">
              <Select
                placeholder="Chọn Job"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {dropdown.job.map((item, index) => {
                  return (
                    <Option key={index} value={item.JOB_NO}>
                      {item.JOB_NO + " | " + item.CUST_NAME}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="To" name="JOB_NO2">
              <Select
                placeholder="Chọn Job"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {dropdown.job.map((item, index) => {
                  return (
                    <Option key={index} value={item.JOB_NO}>
                      {item.JOB_NO + " | " + item.CUST_NAME}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: 10, width: 100 }}
            >
              Xem
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
