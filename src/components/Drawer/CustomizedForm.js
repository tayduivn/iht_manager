import React from 'react'
import { Form, Input, Divider, Row, Col, Button } from "antd";
import { convertDateTime } from "../../utils/help";

const { TextArea } = Input;
const CustomizedForm = ({ fields, onFinish, item }) => {
  const Description = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p
        className="site-description-item-profile-p-label"
        style={{ fontWeight: "600" }}
      >
        {title}:
      </p>
      {content}
    </div>
  );
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  return (
    <Form {...layout} fields={fields} onFinish={onFinish}>
      <p
        className="site-description-item-profile-p"
        style={{ marginBottom: 28 }}
      >
        THÔNG TIN
      </p>
      {fields.map((field, index) => {
        return (
          <Form.Item name={field.name} label={field.label} key={index}>
            {field.area === true ? <TextArea /> : <Input />}
          </Form.Item>
        );
      })}
      <Divider />
      <Row style={{ textAlign: "center" }}>
        <Col span={12}>
          <Description title="Người Nhập" content={item.INPUT_USER} />
        </Col>
        <Col span={12}>
          <Description
            title="Ngày Nhập"
            content={convertDateTime(item.INPUT_DT)}
          />
        </Col>
      </Row>
      <Row style={{ textAlign: "center" }}>
        <Col span={12}>
          <Description title="Người Sửa" content={item.MODIFY_USER} />
        </Col>
        <Col span={12}>
          <Description
            title="Ngày Sửa"
            content={convertDateTime(item.MODIFY_DT)}
          />
        </Col>
      </Row>
      <Form.Item style={{ textAlign: "center" }}>
        <Button type="primary" htmlType="submit">
          Sửa
        </Button>

        <Button type="primary" style={{ marginLeft: 10 }} danger>
          Xóa
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomizedForm