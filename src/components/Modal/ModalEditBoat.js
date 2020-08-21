import React, { useEffect, useState } from "react";
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
  InputNumber,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  actCloseModal,
  actFetchAgentsRequest,
  actFetchCarriersRequest,
} from "../../actions";
import { convertDateTime, openNotificationWithIcon } from "../../utils/help";
import api from "../../utils/api";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const ModalEditBoat = (props) => {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(actCloseModal());
  const stateModal = useSelector((state) => state.isDrawer);
  const getCarrier = () => dispatch(actFetchCarriersRequest());
  const getAgent = () => dispatch(actFetchAgentsRequest());
  const carriers = useSelector((state) => state.carriers);
  const agents = useSelector((state) => state.agents);

  useEffect(() => {
    getCarrier();
    getAgent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var itemJob = props.itemJob.data === undefined ? "" : props.itemJob.data;

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
      name: "SHIPPER",
      value: itemJob.SHIPPER,
    },
    {
      name: "CUSTOMS_DATE",
      value: convertDateTime(itemJob.CUSTOMS_DATE),
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
      name: "CONSIGNEE",
      value: itemJob.CONSIGNEE,
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
      name: "PO_NO",
      value: itemJob.PO_NO,
    },
    {
      name: "APPROVE",
      value: itemJob.CHK_MK === "Y" ? true : false,
    },
    {
      name: "CUST_NO2",
      value: itemJob.CUST_NO2,
    },
    {
      name: "CUST_NO3",
      value: itemJob.CUST_NO3,
    },
  ];

  const onFinish = (values) => {
    const form = new FormData();
    form.append("TYPE", "JOB_ORDER");
    form.append("JOB_NO", values.JOB_NO);
    form.append("CONSIGNEE", values.CONSIGNEE);
    form.append("SHIPPER", values.SHIPPER);
    form.append("ORDER_TO", values.ORDER_TO);
    form.append("CONTAINER_NO", values.CONTAINER_NO);
    form.append("CONTAINER_QTY", values.CONTAINER_QTY);
    form.append("CUSTOMS_NO", values.CUSTOMS_NO);
    form.append("CUSTOMS_DATE", values.CUSTOMS_DATE);
    form.append("BILL_NO", values.BILL_NO);
    form.append("NW", values.NW);
    form.append("GW", values.GW);
    form.append("POL", values.POL);
    form.append("POD", values.POD);
    form.append("ETD_ETA", values.ETD_ETA);
    form.append("PO_NO", values.PO_NO);
    form.append("INVOICE_NO", values.INVOICE_NO);
    form.append("NOTE", values.NOTE);
    form.append("MODIFY_USER", localStorage.getItem("USER_NO"));
    form.append("BRANCH_ID", localStorage.getItem("BRANCH_ID"));
    form.append("CUST_NO2", values.CUST_NO2);
    form.append("CUST_NO3", values.CUST_NO3);
    api("file/job-order/edit", "POST", form).then((res) =>
      openNotificationWithIcon("success", "Thành công", "Cập nhật thành công")
    );
  };

  const closeTest = () => {
    props.changeEdit();
    closeModal();
  };

  const [form] = Form.useForm();

  const onThueChange = (value, index) => {
    var data = form.getFieldValue("data");
    var price = form.getFieldValue("data")[index].PRICE
      ? form.getFieldValue("data")[index].PRICE
      : 0;
    var tax_note = form.getFieldValue("data")[index].TAX_NOTE
      ? form.getFieldValue("data")[index].TAX_NOTE
      : 0;
    var sl = form.getFieldValue("data")[index].QTY
      ? form.getFieldValue("data")[index].QTY
      : 0;
    var sau_thue = price + (price * tax_note) / 100;
    var tong_tien = sau_thue * sl;
    var thue = ((price * tax_note) / 100) * sl;
    data[index].SAU_THUE = sau_thue;
    data[index].TONG_TIEN = tong_tien;
    data[index].TAX_AMT = thue;
  };

  var itemJobD = props.itemJob.job_d === undefined ? [] : props.itemJob.job_d;

  const fields2 = [{ name: "data", value: [...itemJobD] }];

  var newIndex = 0;

  const getIndexEdit = (index) => {
    newIndex = index;
    return newIndex;
  };

  const onFinish2 = (values) => {
    const form = new FormData();
    var item = values.data[newIndex];
    form.append("TYPE", "JOB_ORDER_BOAT");
    form.append("JOB_NO", itemJob.JOB_NO);
    form.append("ORDER_TYPE", item.ORDER_TYPE);
    form.append("DESCRIPTION", item.DESCRIPTION);
    form.append("REV_TYPE", "N");
    form.append("UNIT", item.UNIT);
    form.append("QTY", item.QTY);
    form.append("PRICE", item.PRICE);
    form.append("TAX_NOTE", item.TAX_NOTE);
    form.append("TAX_AMT", item.TAX_AMT);
    form.append("NOTE", item.NOTE);
    form.append("THANH_TOAN_MK", item.THANH_TOAN_MK ? item.THANH_TOAN_MK : "N");
    form.append("BRANCH_ID", localStorage.getItem("BRANCH_ID"));
    if (item.INPUT_USER) {
      form.append("INPUT_USER", item.INPUT_USER);
      form.append("SER_NO", item.SER_NO);
      form.append("MODIFY_USER", localStorage.getItem("USER_NO"));
      api("file/job-order/edit-d", "POST", form).then((res) =>

        openNotificationWithIcon("success", "Thành công", "Cập nhật thành công")
      );
    } else {
      form.append("INPUT_USER", localStorage.getItem("USER_NO"));
      api("file/job-order/add-d", "POST", form).then((res) => {
 
        openNotificationWithIcon(
          "success",
          "Thành công",
          "Cập nhật thành công"
        );
      });
    }
  };

  return (
    <Modal
      title="Thông tin"
      visible={stateModal}
      width="1350px"
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
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Order Date" name="JOB_DATE">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item label="Duyệt" name="APPROVE" valuePropName="checked">
              <Checkbox disabled />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Approve Date" name="CHK_DATE">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={4} style={{ textAlign: "right" }}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sửa
              </Button>
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
            <Form.Item label="Customer Date" name="CUSTOMS_DATE">
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
      </Form>
      <Divider style={{ borderTop: "1px solid #096dd9" }} />
      <Form
        autoComplete="off"
        fields={fields2}
        onFinish={onFinish2}
        form={form}
      >
        <Form.List name="data">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="start"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "ORDER_TYPE"]}
                      fieldKey={[field.key, "ORDER_TYPE"]}
                    >
                      <Select placeholder="Loại" style={{ width: 150 }}>
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
                      <Input placeholder="Description" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "UNIT"]}
                      fieldKey={[field.key, "UNIT"]}
                    >
                      <Input placeholder="ĐVT" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "QTY"]}
                      fieldKey={[field.key, "QTY"]}
                      onChange={(e) => onThueChange(e, index)}
                    >
                      <InputNumber placeholder="SL" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "PRICE"]}
                      fieldKey={[field.key, "PRICE"]}
                    >
                      <InputNumber
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        placeholder="Giá Trước Thuế"
                        onChange={(e) => onThueChange(e, index)}
                      />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "TAX_NOTE"]}
                      fieldKey={[field.key, "TAX_NOTE"]}
                    >
                      <InputNumber
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        placeholder="Thuế"
                        onChange={(e) => onThueChange(e, index)}
                      />
                    </Form.Item>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.data !== currentValues.data
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("data")[index] ? (
                          <Form.Item
                            {...field}
                            name={[field.name, "SAU_THUE"]}
                            fieldKey={[field.key, "SAU_THUE"]}
                          >
                            <InputNumber
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                              placeholder="Giá Sau Thuế"
                              disabled
                              style={{ color: "red" }}
                            />
                          </Form.Item>
                        ) : (
                          <Form.Item
                            {...field}
                            name={[field.name, "SAU_THUE"]}
                            fieldKey={[field.key, "SAU_THUE"]}
                          >
                            <InputNumber placeholder="Giá Sau Thuế" />
                          </Form.Item>
                        )
                      }
                    </Form.Item>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.data !== currentValues.data
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("data")[index] ? (
                          <Form.Item
                            {...field}
                            name={[field.name, "TAX_AMT"]}
                            fieldKey={[field.key, "TAX_AMT"]}
                          >
                            <InputNumber
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                              placeholder="Tiền Thuế"
                              style={{ color: "red" }}
                            />
                          </Form.Item>
                        ) : (
                          <Form.Item
                            {...field}
                            name={[field.name, "TAX_AMT"]}
                            fieldKey={[field.key, "TAX_AMT"]}
                          >
                            <InputNumber placeholder="Tiền Thuế" disabled />
                          </Form.Item>
                        )
                      }
                    </Form.Item>

                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.data !== currentValues.data
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("data")[index] ? (
                          <Form.Item
                            {...field}
                            name={[field.name, "TONG_TIEN"]}
                            fieldKey={[field.key, "TONG_TIEN"]}
                          >
                            <InputNumber
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                              placeholder="Tổng Tiền"
                              disabled
                              style={{ color: "red" }}
                            />
                          </Form.Item>
                        ) : (
                          <Form.Item
                            {...field}
                            name={[field.name, "TONG_TIEN"]}
                            fieldKey={[field.key, "TONG_TIEN"]}
                          >
                            <InputNumber disabled style={{ color: "red" }} />
                          </Form.Item>
                        )
                      }
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "NOTE"]}
                      fieldKey={[field.key, "NOTE"]}
                    >
                      <Input placeholder="Ghi Chú" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "SER_NO"]}
                      fieldKey={[field.key, "SER_NO"]}
                      hidden
                    >
                      <Input disabled />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "THANH_TOAN_MK"]}
                      fieldKey={[field.key, "THANH_TOAN_MK"]}
                    >
                      <Select placeholder="Loại" style={{ width: 150 }}>
                        <Option key={"Y"}>Approved</Option>
                        <Option key={"N"}>Pending</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "INPUT_USER"]}
                      fieldKey={[field.key, "INPUT_USER"]}
                      style={{ width: "70px" }}
                      hidden
                    >
                      <Input placeholder="Người Nhập" disabled />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "INPUT_DT"]}
                      fieldKey={[field.key, "INPUT_DT"]}
                      style={{ width: "70px" }}
                      hidden
                    >
                      <Input disabled />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "MODIFY_USER"]}
                      fieldKey={[field.key, "MODIFY_USER"]}
                      style={{ width: "70px" }}
                      initialValue={null}
                      hidden
                    >
                      <Input placeholder="Người sửa" disabled />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "MODIFY_DT"]}
                      fieldKey={[field.key, "MODIFY_DT"]}
                      style={{ width: "70px" }}
                      initialValue=""
                      hidden
                    >
                      <Input disabled />
                    </Form.Item>
                    <Button
                      htmlType="submit"
                      icon={<CheckCircleOutlined />}
                      type="link"
                      onClick={() => getIndexEdit(index)}
                    ></Button>
                    <Button
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(field.name)}
                      type="link"
                    />
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
      </Form>
    </Modal>
  );
};

export default ModalEditBoat;
