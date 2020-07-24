import React from "react";
import { Form, Row, Col, Input, Button, Select } from "antd";
import { useDispatch } from "react-redux";
import { actOpenDrawer, actEmptyDetail } from "../../actions";

const { Option } = Select;

const SearchApi = (onSearch) => {
  const dispatch = useDispatch();
  const openDrawer = () => dispatch(actOpenDrawer());
  const emptyDetail = () => dispatch(actEmptyDetail());
  return (
    <Form onFinish={onSearch}>
      <Row gutter={24} style={{ padding: 10 }}>
        <Col className="gutter-row" span={8}>
          <Form.Item name='type'>
            <Select placeholder='Chọn' style={{ width: 200 }}>
              <Option value="1">Job No</Option>
              <Option value="2">Bill No</Option>
              <Option value="3">Note</Option>
              <Option value="4">Nhân viên chứng từ</Option>
              <Option value="5">Tên Khách Hàng</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="keyword">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tìm (Search)
            </Button>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Button
            type="primary"
            onClick={() => {
              openDrawer();
              emptyDetail();
            }}
          >
            Tạo
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchApi;
