import React, { useEffect } from "react";
import { Modal, Form, Row, Col, Input, Button, Checkbox, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  actCloseModal,
  actJobNotCreateOrderRequest,
  actGetJobRequest,
  actFetchCarriersRequest,
  actFetchAgentsRequest,
  actAddJobOrderRequest,
} from "../../actions";
// import _ from "lodash";

const { Option } = Select;

const ModalCreateBoat = () => {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(actCloseModal());
  const stateModal = useSelector((state) => state.isDrawer);
  const jobs = useSelector((state) => state.jobsnco);
  const fetchJobNotCreateOrder = () => dispatch(actJobNotCreateOrderRequest());
  const getJob = (JOB_NO) => dispatch(actGetJobRequest(JOB_NO));
  const getCarrier = () => dispatch(actFetchCarriersRequest());
  const getAgent = () => dispatch(actFetchAgentsRequest());
  const carriers = useSelector((state) => state.carriers);
  const agents = useSelector((state) => state.agents);
  const itemJob = useSelector((state) => state.itemCustomer);
  const addJobOrder = (value) => dispatch(actAddJobOrderRequest(value));

  const onFinish = (values) => {
    console.log(values);
    const form = new FormData();
    form.append("JOB_NO", values.JOB_NO);
    form.append("CUST_NO", values.CUST_NO);
    form.append("ORDER_FROM", values.ORDER_FROM);
    form.append("ORDER_TO", values.ORDER_TO);
    form.append("CONTAINER_NO", values.CONTAINER_NO);
    form.append("CONTAINER_QTY", values.CONTAINER_QTY);
    form.append("CUSTOMS_NO", values.CUSTOMS_NO);
    form.append("CUSTOMS_DATE", values.CUSTOMS_DATE);
    form.append("SHIPPER", values.SHIPPER);
    form.append("BILL_NO", values.BILL_NO);
    form.append("NW", values.NW);
    form.append("GW", values.GW);
    form.append("POL", values.POL);
    form.append("POD", values.POD);
    form.append("ETD_ETA", values.ETD_ETA);
    form.append("PO_NO", values.PO_NO);
    form.append("INVOICE_NO", values.INVOICE_NO);
    form.append("NOTE", values.NOTE);
    form.append("INPUT_USER", localStorage.getItem("USER_NO"));
    form.append("BRANCH_ID", localStorage.getItem("BRANCH_ID"));
    form.append("CUST_NO2", values.CUST_NO2);
    form.append("CUST_NO3", values.CUST_NO3);
    addJobOrder(form);
  };
  useEffect(() => {
    fetchJobNotCreateOrder();
    getCarrier();
    getAgent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (values) => {
    getJob(values);
  };

  const fields = [
    { name: "JOB_NO", value: itemJob.JOB_NO },
    {
      name: "JOB_DATE",
      value: itemJob.JOB_DATE ? itemJob.JOB_DATE : itemJob.ORDER_DATE,
    },
    {
      name: "CUSTOMS_NO",
      value: itemJob.CUSTOMS_NO,
    },
    {
      name: "CUST_NAME",
      value: itemJob.CUST_NAME,
    },
    {
      name: "BILL_NO",
      value: itemJob.BILL_NO,
    },
    {
      name: "ORDER_FROM",
      value: itemJob.ORDER_FROM,
    },
    {
      name: "ORDER_TO",
      value: itemJob.ORDER_TO,
    },
    {
      name: "CUST_NO",
      value: itemJob.CUST_NO,
    },
    {
      name: "NV_GIAONHAN",
      value: itemJob.NV_GIAONHAN,
    },
    {
      name: "CUSTOMS_DATE",
      value: itemJob.CUSTOMS_DATE,
    },
    {
      name: "INVOICE_NO",
      value: itemJob.INVOICE_NO,
    },
    {
      name: "CONTAINER_NO",
      value: itemJob.CONTAINER_NO,
    },
    {
      name: "CONTAINER_QTY",
      value: itemJob.CONTAINER_QTY,
    },
    {
      name: "NW",
      value: itemJob.NW,
    },
    {
      name: "GW",
      value: itemJob.GW,
    },
    {
      name: "POL",
      value: itemJob.POL,
    },
    {
      name: "PO_NO",
      value: itemJob.PO_NO,
    },
    {
      name: "POD",
      value: itemJob.POD,
    },
    {
      name: "ETA_ETD",
      value: itemJob.ETA_ETD,
    },
    {
      name: "NOTE",
      value: itemJob.NOTE,
    },
    {
      name: "APPROVE",
      value: itemJob.CHK_MK === "Y" ? true : false,
    },
    {
      name: "CONSIGNEE",
      value: itemJob.CONSIGNEE,
    },
  ];

  return (
    <Modal
      title="Thông tin"
      visible={stateModal}
      width="1000px"
      footer={[]}
      onCancel={closeModal}
    >
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        fields={fields}
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
                onChange={onChange}
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
          <Col span={8}>
            <Form.Item label="Order Date" name="JOB_DATE">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Duyệt" name="APPROVE" valuePropName="checked">
              <Checkbox disabled />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Approve Date" name="Approve">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="Customer No" name="CUST_NO">
              <Input />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item name="CUST_NAME">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Carriers" name="CUST_NO2">
              <Select
                placeholder="Chọn"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {carriers.map((item, index) => {
                  return (
                    <Option key={index} value={item.CUST_NO}>
                      {`${item.CUST_NO} | ${item.CUST_NAME}`}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Agent" name="CUST_NO3">
              <Select
                placeholder="Chọn"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {agents.map((item, index) => {
                  return (
                    <Option key={index} value={item.CUST_NO}>
                      {`${item.CUST_NO} | ${item.CUST_NAME}`}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="Consignee" name="CONSIGNEE">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Shipper" name="SHIPPER">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Bill No" name="BILL_NO">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="Order From" name="ORDER_FROM">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Order To" name="ORDER_TO">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Số tờ khai" name="CUSTOMS_NO">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="Cust Date" name="CUSTOMS_DATE">
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Invoice No" name="INVOICE_NO">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Container No" name="CONTAINER_NO">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="Container Qty" name="CONTAINER_QTY">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="New Weight" name="NW">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="GW" name="GW">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="POL" name="POL">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="POD" name="POD">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="ETD/ETA" name="ETA_ETD">
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="P/O No" name="PO_NO">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="Ghi Chú" name="NOTE">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ textAlign: "right" }}>
          <Button
            type="primary"
            htmlType="submit"
            // onClick={() => {
            //   closeModal();
            // }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreateBoat;
