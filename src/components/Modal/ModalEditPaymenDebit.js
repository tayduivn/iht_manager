import React, { useEffect } from "react";
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
  actFetchCostsRequest,
} from "../../actions";
import { convertDateTime, openNotificationWithIcon } from "../../utils/help";
import api from "../../utils/api";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const ModalEditPaymentDebit = (props) => {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(actCloseModal());
  const stateModal = useSelector((state) => state.isDrawer);
  const getCarrier = () => dispatch(actFetchCarriersRequest());
  const getAgent = () => dispatch(actFetchAgentsRequest());
  const carriers = useSelector((state) => state.carriers);
  const agents = useSelector((state) => state.agents);
  const costs = useSelector((state) => state.costs);
  const fetchCosts = () => dispatch(actFetchCostsRequest());

  useEffect(() => {
    getCarrier();
    getAgent();
    fetchCosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var itemJob =
    props.itemJob.debit_note_m === undefined ? "" : props.itemJob.debit_note_m;
  const fields = [
    { name: "JOB_NO", value: itemJob.JOB_NO },
    {
      name: "DEBIT_DATE",
      value: itemJob.DEBIT_DATE,
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
      name: "TRANS_FROM",
      value: itemJob.TRANS_FROM,
    },
    {
      name: "TRANS_TO",
      value: itemJob.TRANS_TO,
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
      name: "PAYMENT_CHK",
      value: itemJob.PAYMENT_CHK === "Y" ? true : false,
    },
    {
      name: "CUST_NO2",
      value: itemJob.CUST_NO2,
    },
    {
      name: "CUST_NO3",
      value: itemJob.CUST_NO3,
    },
    {
      name: "PAYMENT_DATE",
      value: convertDateTime(itemJob.PAYMENT_DATE),
    },
  ];

  const onFinish = (values) => {
    const form = new FormData();
    form.append("JOB_NO", values.JOB_NO);
    form.append("CONSIGNEE", values.CONSIGNEE);
    form.append("SHIPPER", values.SHIPPER);
    form.append("TRANS_FROM", values.TRANS_FROM);
    form.append("TRANS_TO", values.TRANS_TO);
    form.append("ORDER_NO", "");
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
    form.append("CONTAINER_NO", values.CONTAINER_NO);
    form.append("MODIFY_USER", localStorage.getItem("USER_NO"));
    form.append("CUST_NO2", values.CUST_NO2);
    form.append("CUST_NO3", values.CUST_NO3);
    form.append("CUST_NO4", values.CUST_NO4);
    form.append("CUST_NO5", values.CUST_NO5);
    api("payment/debit-note/edit", "POST", form).then((res) =>
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
    var dor_amt = form.getFieldValue("data")[index].DOR_AMT
      ? form.getFieldValue("data")[index].DOR_AMT
      : 0;
    var dor_rate = form.getFieldValue("data")[index].DOR_RATE
      ? form.getFieldValue("data")[index].DOR_RATE
      : 0;
    var qty = form.getFieldValue("data")[index].QUANTITY
      ? form.getFieldValue("data")[index].QUANTITY
      : 0;

    var price = form.getFieldValue("data")[index].PRICE
      ? form.getFieldValue("data")[index].PRICE
      : 0;
    var tax_note = form.getFieldValue("data")[index].TAX_NOTE;
    var tax_mount = 0;
    var amount = 0;
    var dor_no = form.getFieldValue("data")[index].DOR_NO;
    if (dor_no === "USD") {
      price = dor_amt * dor_rate;
      tax_mount = (price * tax_note) / 100;
      amount = price * qty + tax_mount;
      data[index].PRICE = price;
      data[index].TAX_AMT = tax_mount;
      data[index].TOTAL_AMT = amount;
    } else {
      tax_mount = (price * tax_note) / 100;
      amount = price * qty + tax_mount;
      data[index].TAX_AMT = tax_mount;
      data[index].TOTAL_AMT = amount;
    }
  };

  var itemJobD =
    props.itemJob.debit_note_d === undefined ? [] : props.itemJob.debit_note_d;

  const fields2 = [{ name: "data", value: [...itemJobD] }];

  var newIndex = 0;

  const getIndexEdit = (index) => {
    newIndex = index;
    return newIndex;
  };

  const onFinish2 = (values) => {
    const form = new FormData();
    var item = values.data[newIndex];
    form.append("JOB_NO", itemJob.JOB_NO); //
    form.append("INV_NO", itemJob.INV_NO); //
    form.append("INV_YN", "N");
    form.append("CUSTOM_NO", "");
    form.append("DESCRIPTION", item.DESCRIPTION);
    form.append("CUSTOM_NO", "");
    form.append("UNIT", item.UNIT);
    form.append("QUANTITY", item.QUANTITY);
    form.append("PRICE", item.PRICE);
    form.append("TAX_NOTE", item.TAX_NOTE);
    form.append("TAX_AMT", item.TAX_AMT);
    form.append("TOTAL_AMT", item.TOTAL_AMT);
    form.append("NOTE", "");
    form.append("DOR_NO", item.DOR_NO);
    form.append("DOR_AMT", item.DOR_AMT);
    form.append("DOR_RATE", item.DOR_RATE);
    form.append("DEB_TYPE", item.DEB_TYPE);
    form.append("BRANCH_ID", localStorage.getItem("BRANCH_ID"));
    if (item.INPUT_USER) {
      form.append("INPUT_USER", item.INPUT_USER);
      form.append("SER_NO", item.SER_NO); //
      form.append("MODIFY_USER", localStorage.getItem("USER_NO"));
      api("payment/debit-note/edit-d", "POST", form).then((res) =>
        openNotificationWithIcon("success", "Thành công", "Cập nhật thành công")
      );
    } else {
      form.append("INPUT_USER", localStorage.getItem("USER_NO"));
      api("payment/debit-note/add-d", "POST", form).then((res) => {
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
            <Form.Item label="Debit Date" name="DEBIT_DATE">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item
              label="Paid Mk"
              name="PAYMENT_CHK"
              valuePropName="checked"
            >
              <Checkbox disabled />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Payment Date" name="PAYMENT_DATE">
              <Input />
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
            <Form.Item label="Order From" name="TRANS_FROM">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Order To" name="TRANS_TO">
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
              <div style={{ overflowX: "scroll" }}>
                {fields.map((field, index) => (
                  <Space
                    key={field.key}
                    style={{ marginBottom: 8, width: "2000px" }}
                    align="start"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "DEB_TYPE"]}
                      fieldKey={[field.key, "DEB_TYPE"]}
                    >
                      <Select placeholder="Loại" style={{ width: 150 }}>
                        <Option key={"I"}>Our Company Pay</Option>
                        <Option key={"O"}>Pay In Advance</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "INV_NO"]}
                      fieldKey={[field.key, "INV_NO"]}
                    >
                      <Input placeholder="Invoice No" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "DESCRIPTION"]}
                      fieldKey={[field.key, "DESCRIPTION"]}
                    >
                      <Select
                        placeholder="Chọn"
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        style={{ width: 300 }}
                      >
                        {costs.map((item, index) => {
                          return (
                            <Option
                              key={item.DESCRIPTION_CODE}
                              value={item.DESCRIPTION_CODE}
                            >
                              {`${item.DESCRIPTION_NAME_CN} | ${item.DESCRIPTION_NAME_VN}`}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "DOR_NO"]}
                      fieldKey={[field.key, "DOR_NO"]}
                    >
                      <Select placeholder="Currency">
                        <Option key={"VND"}>VND</Option>
                        <Option key={"USD"}>USD</Option>
                      </Select>
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
                            name={[field.name, "DOR_AMT"]}
                            fieldKey={[field.key, "DOR_AMT"]}
                          >
                            <InputNumber
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                              placeholder="Price"
                              onChange={(e) => onThueChange(e, index)}
                              style={{ width: 150, color: "red" }}
                            />
                          </Form.Item>
                        ) : (
                          <Form.Item
                            {...field}
                            name={[field.name, "DOR_AMT"]}
                            fieldKey={[field.key, "DOR_AMT"]}
                          >
                            <InputNumber
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                              placeholder="Price"
                              style={{ width: 150, color: "red" }}
                              disabled
                            />
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
                            name={[field.name, "DOR_RATE"]}
                            fieldKey={[field.key, "DOR_RATE"]}
                          >
                            <InputNumber
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                              placeholder="Rate"
                              onChange={(e) => onThueChange(e, index)}
                              style={{ color: "red" }}
                            />
                          </Form.Item>
                        ) : (
                          <Form.Item
                            {...field}
                            name={[field.name, "DOR_RATE"]}
                            fieldKey={[field.key, "DOR_RATE"]}
                          >
                            <InputNumber
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                              placeholder="Rate"
                              disabled
                              style={{ color: "red" }}
                            />
                          </Form.Item>
                        )
                      }
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, "QUANTITY"]}
                      fieldKey={[field.key, "QUANTITY"]}
                    >
                      <InputNumber
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        placeholder="QTY"
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
                            name={[field.name, "PRICE"]}
                            fieldKey={[field.key, "PRICE"]}
                          >
                            <InputNumber
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                              placeholder="Price (VND)"
                              onChange={(e) => onThueChange(e, index)}
                              style={{ width: 100 }}
                            />
                          </Form.Item>
                        ) : (
                          <Form.Item
                            {...field}
                            name={[field.name, "PRICE"]}
                            fieldKey={[field.key, "PRICE"]}
                          >
                            <InputNumber
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                              placeholder="Price (VND)"
                              onChange={(e) => onThueChange(e, index)}
                              style={{ width: 100 }}
                            />
                          </Form.Item>
                        )
                      }
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "TAX_NOTE"]}
                      fieldKey={[field.key, "TAX_NOTE"]}
                      initialValue={"0"}
                    >
                      <Select
                        placeholder="Tax"
                        onChange={(e) => onThueChange(e, index)}
                      >
                        <Option key={"0"}>0</Option>
                        <Option key={"10"}>10</Option>
                      </Select>
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
                              disabled
                              placeholder="Tax Amount"
                              style={{ color: "red" }}
                            />
                          </Form.Item>
                        ) : (
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
                              disabled
                              placeholder="Tax Amount"
                              style={{ color: "red" }}
                            />
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
                            name={[field.name, "TOTAL_AMT"]}
                            fieldKey={[field.key, "TOTAL_AMT"]}
                          >
                            <InputNumber
                              placeholder="Amount"
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                              style={{ color: "red" }}
                              disabled
                            />
                          </Form.Item>
                        ) : (
                          <Form.Item
                            {...field}
                            name={[field.name, "TOTAL_AMT"]}
                            fieldKey={[field.key, "TOTAL_AMT"]}
                          >
                            <InputNumber
                              placeholder="Amount"
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                              style={{ color: "red" }}
                              disabled
                            />
                          </Form.Item>
                        )
                      }
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

export default ModalEditPaymentDebit;
