import React, { useEffect } from "react";
import { Modal, Form, Row, Col, Input, Button, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  actCloseModal,
  actJobNotCreateOrderRequest,
  actFetchStaffsRequest,
  actItemJobPaymentRequest,
  actPaymentRequest,
} from "../../actions";
// import _ from "lodash";

const { Option } = Select;

const ModalPayment = () => {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(actCloseModal());
  const stateModal = useSelector((state) => state.isDrawer);
  const jobs = useSelector((state) => state.jobsnco);
  const getStaffs = () => dispatch(actFetchStaffsRequest());
  const fetchJobNotCreateOrder = () => dispatch(actJobNotCreateOrderRequest());
  const itemJob = useSelector((state) => state.itemJobPayment);
  const getJob = (JOB_NO) => dispatch(actItemJobPaymentRequest(JOB_NO));
  const staffs = useSelector((state) => state.staffs);
  const addPayment = (payment) => dispatch(actPaymentRequest(payment));

  const onFinish = (values) => {
    const form = new FormData();
    form.append("TOTAL_AMT", "0");
    form.append("CONTAINER_QTY", values.CONTAINER_QTY);
    form.append("CUST_NO", values.CUST_NO);
    form.append("DOR_NO", values.DOR_NO);
    form.append("JOB_NO", values.JOB_NO);
    form.append("LENDER_TYPE", values.LENDER_TYPE);
    form.append("LEND_REASON", values.LEND_REASON);
    form.append("ORDER_FROM", values.ORDER_FROM);
    form.append("ORDER_TO", values.ORDER_TO);
    form.append("PNL_NO", values.PNL_NO);
    form.append("INPUT_USER", localStorage.getItem("USER_NO"));
    form.append("BRANCH_ID", localStorage.getItem("BRANCH_ID"));
    addPayment(form);
  };
  useEffect(() => {
    fetchJobNotCreateOrder();
    getStaffs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (values) => {
    if (values.JOB_NO) {
      getJob(values.JOB_NO);
    }
  };

  const fields = [
    {
      name: "CUST_NO",
      value: itemJob.CUST_NO,
    },
    { name: "CUST_NAME", value: itemJob.CUST_NAME },
    { name: "ORDER_FROM", value: itemJob.ORDER_FROM },
    { name: "ORDER_TO", value: itemJob.ORDER_TO },
    { name: "CONTAINER_QTY", value: itemJob.CONTAINER_QTY },
  ];

  return (
    <Modal
      title="Thông tin"
      visible={stateModal}
      width="900px"
      footer={[]}
      onCancel={closeModal}
    >
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        fields={fields}
        onValuesChange={onChange}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="Job No" name="JOB_NO">
              <Select
                placeholder="Chọn Job"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {jobs.map((item, index) => {
                  return (
                    <Option key={index} value={item.JOB_NO}>
                      {item.JOB_NO}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Type" name="LENDER_TYPE">
              <Select placeholder="Chọn">
                <Option value="U">Phieu Tam Ung</Option>
                <Option value="T">Chi Tam Ung</Option>
                <Option value="C">Chi Truc Tiep</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Advance No" name="LENDER_NO">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Date" name="LENDER_DATE">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Advance Staff" name="PNL_NO">
              <Select
                placeholder="Chọn"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={onChange}
              >
                {staffs.map((item, index) => {
                  return (
                    <Option key={item.PNL_NO}>
                      {item.PNL_NO + " " + item.PNL_NAME}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Kinds Of Money" name="DOR_NO">
              <Select placeholder="Chọn">
                <Option value="VND">VND</Option>
                <Option value="USD">USD</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="Customer No" name="CUST_NO">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label="" name="CUST_NAME">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={10}>
            <Form.Item label="Order From" name="ORDER_FROM">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={4} />

          <Col span={10}>
            <Form.Item label="Order To" name="ORDER_TO">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={10}>
            <Form.Item label="Container Qty" name="CONTAINER_QTY">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="Reasons" name="LEND_REASON">
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalPayment;
