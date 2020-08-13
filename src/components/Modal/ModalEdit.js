import React from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Input,
  Button,
  Checkbox,
  Select,
  Divider,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actCloseModal } from "../../actions";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { payDescription } from "../../utils/help";


const { Option } = Select;

const ModalEdit = (props) => {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(actCloseModal());
  const stateModal = useSelector((state) => state.isDrawer);

  var itemJob = props.itemJob.data === undefined ? "" : props.itemJob.data;
  var itemJobD = props.itemJob.job_d === undefined ? [] : props.itemJob.job_d;

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
      name: "data",
      value: [...itemJobD],
    },
  ];

  const onFinish = (values) => {
    console.log(values);
  };

  const closeTest = () => {
    props.changeEdit();
    closeModal();
  };

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
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="Job No" name="JOB_NO">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Order Date" name="JOB_DATE">
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Duyệt" name="APPROVE" valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Approve Date" name="Approve">
              <Input />
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
          <Col span={8}>
            <Form.Item label="Consignee" name="">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Shipper" name="NV_GIAONHAN">
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
          <Col span={6}>
            <Form.Item label="Customer Date" name="CUSTOMS_DATE">
              <Input />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item label="Invoice No" name="INVOICE_NO">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
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
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="P/O No">
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
        <Divider />
        <Form.List name="data">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="start"
                  >
                    <Form.Item
                      // {...field}
                      name={[field.name, "ORDER_TYPE"]}
                      fieldKey={[field.key, "ORDER_TYPE"]}
                    >
                      <Select placeholder="Loại" style={{ width: 200 }}>
                        <Option key={"I"}>Our Company Pay</Option>
                        <Option key={"O"}>Pay In Advance</Option>
                        <Option key={"T"}>Trucking Fee</Option>
                        <Option key={"C"}>Cược Cont</Option>
                        <Option key={"8"}>Cược Sửa Chữa Cont</Option>
                        <Option key={"6"}>Refund Khách Hàng</Option>
                        <Option key={"5"}>Refund Hãng Tàu</Option>
                        <Option key={"7"}>Refund Đại Lý</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "DESCRIPTION"]}
                      fieldKey={[field.key, "DESCRIPTION"]}
                    >
                      <Select
                        placeholder="Description"
                        style={{ width: 150 }}
                        showSearch
                        dropdownRender={(menu) => <div>{menu}</div>}
                      >
                        {payDescription.map((item) => {
                          return <Option key={item}>{item}</Option>;
                        })}
                      </Select>
                    </Form.Item>                    
                    <Form.Item>
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block
                  >
                    <PlusOutlined /> Add field
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
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

export default ModalEdit;
