import React, { useEffect } from "react";
import { Form, Input, Divider, Row, Col, Button, Select } from "antd";
import { convertDateTime } from "../../utils/help";
import { useDispatch } from "react-redux";
import {
  actItemJobPaymentRequest,
} from "../../actions";
import { actDropDownCustomerRequest, actDropDownStaffRequest } from "../../actions/actionDropDownList";

const { TextArea } = Input;
const { Option } = Select;
const CustomizedForm = ({ fields, onFinish, item }) => {
  const dispatch = useDispatch();
  const fetchStaffs = () => dispatch(actDropDownStaffRequest());
  const fetchCustomers = () => dispatch(actDropDownCustomerRequest());
  // const fetchJobs = () => dispatch(actFetchJobsRequest());
  const getJob = (JOB_NO) => dispatch(actItemJobPaymentRequest(JOB_NO));

  useEffect(() => {
    fetchStaffs();
    fetchCustomers();
    // fetchJobs();
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
        <Option
          key={index}
          value={item.CUST_NO}
        >{`${item.CUST_NO} | ${item.CUST_NAME}`}</Option>
      ));
    }
  };

  const onChange = (value) => {
    // console.log(value);
    getJob(value);
  };

  const [form] = Form.useForm();

  return (
    <Form
      {...layout}
      fields={fields}
      form={form}
      onFinish={onFinish}
      autoComplete="off"
    >
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
            ) : field.select2 ? (
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={onChange}
              >
                {field.dataSelect.map((item, index) => (
                  <Option
                    key={index}
                    value={item.JOB_NO}
                  >{`${item.JOB_NO} | ${item.CUST_NAME}`}</Option>
                ))}
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
