import React, { useEffect } from "react";
import { Form, Input, Divider, Row, Col, Button, Select } from "antd";
import { convertDateTime } from "../../utils/help";
import { useDispatch } from "react-redux";
import {
  actFetchStaffsRequest,
  actFetchCustomersRequeset,
} from "../../actions";

const { TextArea } = Input;
const { Option } = Select;
const CustomizedForm = ({ fields, onFinish, item }) => {
  const dispatch = useDispatch();
  const fetchStaffs = () => dispatch(actFetchStaffsRequest());
  const fetchCustomers = () => dispatch(actFetchCustomersRequeset());

  useEffect(() => {
    fetchStaffs();
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const checkSelect = (field) => {
    if (field.name === "PNL_NO" || field.name === "PNL_NO1") {
      return field.dataSelect.map((item, index) => (
        <Option key={item.PNL_NO}>{item.PNL_NO + " " + item.PNL_NAME}</Option>
      ));
    } else if (field.name === "DOR_NO") {
      return (
        <>
          <Option value={"VND"}>VND</Option>
          <Option value={"USD"}>USD</Option>
        </>
      );
    } else if (field.name === "LENDER_NAME") {
      return (
        <>
          <Option value={"C"}>Chi Trực Tiếp</Option>
          <Option value={"T"}>Chi Tạm Ứng</Option>
          <Option value={"U"}>Phiếu Tạm Ứng</Option>
        </>
      );
    } else if (field.name === "CUST_NO") {
      return field.dataSelect.map((item, index) => (
        <Option key={index} value={item.CUST_NO}>{`${item.CUST_NO} | ${item.CUST_NAME}`}</Option>
      ));
    }
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
            {field.area === true ? (
              <TextArea />
            ) : field.disabled === true ? (
              <Input disabled />
            ) : field.select ? (
              <Select
                showSearch
                optionFilterProp="children"
                
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {checkSelect(field)}
              </Select>
            ) : field.date === true ? (
              <Input type="date" />
            ) : (
              <Input />
            )}
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
          Lưu
        </Button>

        <Button type="primary" style={{ marginLeft: 10 }} danger>
          Xóa
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomizedForm;
