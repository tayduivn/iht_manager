import React from "react";
import { Form, Row, Col, Input, Button, Select } from "antd";
import { useDispatch } from "react-redux";
import { actOpenDrawer, actEmptyDetail, actOpenModal, actEmptyDetailJob } from "../../actions";

const { Option } = Select;

const SearchApi = (onSearch, valueModal, type) => {
  const dispatch = useDispatch();
  const openDrawer = () => dispatch(actOpenDrawer());
  const emptyDetail = () => dispatch(actEmptyDetail());
  const emptyDetailJob = () => dispatch(actEmptyDetailJob());
  const openModal = () => dispatch(actOpenModal());
  return (
    <Form onFinish={onSearch}>
      <Row gutter={24} style={{ padding: 10 }}>
        <Col className="gutter-row" span={8}>
          <Form.Item name='type'>
            <Select placeholder='Chọn' style={{ width: 200 }}>
              {type ? (<><Option value="6">Advance No</Option>
              <Option value="7">Nhân viên</Option>
              <Option value="8">Job No</Option></>) : (<>
              <Option value="1">Job No</Option>
              <Option value="2">Bill No</Option>
              <Option value="3">Note</Option>
              <Option value="4">Nhân viên chứng từ</Option>
              <Option value="5">Tên Khách Hàng</Option>
              </>) }
              
              
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
              if (valueModal === true || valueModal === false) {
                emptyDetailJob()
                openModal()
              } else {
                emptyDetail();
                openDrawer();
              }
              
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
