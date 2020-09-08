import React from "react";
import { Modal, Form, Row, Col, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  actCloseModal,
  actItemJobPaymentRequest,
  actEmptyItemDetailJob,
  actEditPaymentRequest,
} from "../../actions";

const { Option } = Select;

const ModalEditPayment = (props) => {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(actCloseModal());
  const stateModal = useSelector((state) => state.isDrawer);
  const jobs = useSelector((state) => state.jobsnco);
  const staffs = useSelector((state) => state.staffs);
  const getJob = (JOB_NO) => dispatch(actItemJobPaymentRequest(JOB_NO));
  const itemPayment = useSelector((state) => state.itemCustomer);
  const emptyDetailJob = () => dispatch(actEmptyItemDetailJob());
  const editPayment = (payments) => dispatch(actEditPaymentRequest(payments));

  const itemJob = useSelector((state) => state.itemJobPayment);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    const form = new FormData();
    form.append("AMOUNT_1", values.AMOUNT_1);
    form.append("AMOUNT_2", values.AMOUNT_2);
    form.append("AMOUNT_3", values.AMOUNT_3);
    form.append("AMOUNT_4", values.AMOUNT_4);
    form.append("AMOUNT_5", values.AMOUNT_5);
    form.append("CONTAINER_QTY", values.CONTAINER_QTY);
    form.append("CUST_NO", values.CUST_NO);
    form.append("CUST_NAME", values.CUST_NAME);
    form.append("DOR_NO", values.DOR_NO);
    form.append("JOB_NO", values.JOB_NO);
    form.append("LENDER_TYPE", values.LENDER_TYPE);
    form.append("LEND_REASON", values.LEND_REASON);
    form.append("ORDER_FROM", values.ORDER_FROM);
    form.append("ORDER_TO", values.ORDER_TO);
    form.append("PNL_NO", values.PNL_NO);
    form.append("LENDER_NO", values.LENDER_NO);
    form.append("MODIFY_USER", localStorage.getItem("USER_NO"));
    form.append("BRANCH_ID", localStorage.getItem("BRANCH_ID"));
    editPayment(form);
  };

  const closeTest = () => {
    props.changeEdit();
    emptyDetailJob();
    closeModal();
  };

  const onChange = (values) => {
    if (values.JOB_NO) {
      getJob(values.JOB_NO);
    }
  };

  const fields = [
    {
      name: "JOB_NO",
      value: itemJob.JOB_NO ? itemJob.JOB_NO : itemPayment.JOB_NO,
    },
    {
      name: "PNL_NO",
      value: itemPayment.PNL_NO,
    },
    {
      name: "LENDER_TYPE",
      value: itemPayment.LENDER_TYPE,
    },
    {
      name: "LENDER_NO",
      value: itemPayment.LENDER_NO,
    },
    {
      name: "LENDER_DATE",
      value: itemPayment.LENDER_DATE,
    },
    {
      name: "DOR_NO",
      value: itemPayment.DOR_NO,
    },
    {
      name: "CUST_NO",
      value: itemJob.CUST_NO ? itemJob.CUST_NO : itemPayment.CUST_NO,
    },
    {
      name: "CUST_NAME",
      value: itemJob.CUST_NAME ? itemJob.CUST_NAME : itemPayment.CUST_NAME,
    },
    {
      name: "ORDER_FROM",
      value: itemJob.ORDER_FROM ? itemJob.ORDER_FROM : itemPayment.ORDER_FROM,
    },
    {
      name: "ORDER_TO",
      value: itemJob.ORDER_TO ? itemJob.ORDER_TO : itemPayment.ORDER_TO,
    },
    {
      name: "CONTAINER_QTY",
      value: itemJob.CONTAINER_QTY
        ? itemJob.CONTAINER_QTY
        : itemPayment.CONTAINER_QTY,
    },
    {
      name: "AMOUNT_1",
      value: itemPayment.AMOUNT_1,
    },
    {
      name: "AMOUNT_2",
      value: itemPayment.AMOUNT_2,
    },
    {
      name: "AMOUNT_3",
      value: itemPayment.AMOUNT_3,
    },
    {
      name: "AMOUNT_4",
      value: itemPayment.AMOUNT_4,
    },
    {
      name: "AMOUNT_5",
      value: itemPayment.AMOUNT_5,
    },
    {
      name: "LEND_REASON",
      value: itemPayment.LEND_REASON,
    },
  ];

  return (
    <Modal
      title="Thông tin"
      visible={stateModal}
      width="900px"
      footer={[]}
      onCancel={closeTest}
    >
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        fields={fields}
        onValuesChange={onChange}
        form={form}
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
                  return <Option key={item.JOB_NO}>{item.JOB_NO}</Option>;
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
          <Col span={12}>
            <Form.Item name="AMOUNT_1" label="Amount 1">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            {fields[12].value === "0" ? (
              <Form.Item name="AMOUNT_2" label="Amount 2">
                <Input />
              </Form.Item>
            ) : (
              <Form.Item name="AMOUNT_2" label="Amount 2">
                <Input disabled />
              </Form.Item>
            )}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            {fields[13].value === "0" ? (
              <Form.Item label="Amount 3" name="AMOUNT_3">
                <Input />
              </Form.Item>
            ) : (
              <Form.Item label="Amount 3" name="AMOUNT_3">
                <Input disabled />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {fields[14].value === "0" ? (
              <Form.Item label="Amount 4" name="AMOUNT_4">
                <Input />
              </Form.Item>
            ) : (
              <Form.Item label="Amount 4" name="AMOUNT_4">
                <Input disabled />
              </Form.Item>
            )}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            {fields[15].value === "0" ? (
              <Form.Item label="Amount 5" name="AMOUNT_5">
                <Input />
              </Form.Item>
            ) : (
              <Form.Item label="Amount 5" name="AMOUNT_5">
                <Input disabled />
              </Form.Item>
            )}
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
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditPayment;
