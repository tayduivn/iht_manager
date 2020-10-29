import React from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  InputNumber,
  Divider,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  actCloseModal,
  actEmptyItemDetailJob,
  actEditPaymentRequest,
} from "../../actions";
import { convertDateTime, openNotificationWithIcon } from "../../utils/help";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import api from "../../utils/api";

const { Option } = Select;

const ModalEditPayment = (props) => {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(actCloseModal());
  const stateModal = useSelector((state) => state.isDrawer);
  const staffs = useSelector((state) => state.staffs);
  const emptyDetailJob = () => dispatch(actEmptyItemDetailJob());
  const editPayment = (payments) => dispatch(actEditPaymentRequest(payments));

  var itemJob = props.itemJob.data === undefined ? "" : props.itemJob.data;

  var itemJobD =
    props.itemJob.lenderD === undefined ? [] : props.itemJob.lenderD;

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const form = new FormData();
    form.append("TOTAL_AMT", values.TOTAL_AMT);
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

  var sum = itemJobD.reduce((n, { LENDER_AMT }) => n + parseInt(LENDER_AMT), 0);

  var buTra =
    sum -
    (parseInt(itemJob.sum_PORT_AMT) + parseInt(itemJob.sum_INDUSTRY_ZONE_AMT));

  const fields = [
    {
      name: "JOB_NO",
      value: itemJob.JOB_NO,
    },
    {
      name: "PNL_NO",
      value: itemJob.PNL_NO,
    },
    {
      name: "LENDER_TYPE",
      value: itemJob.LENDER_TYPE,
    },
    {
      name: "LENDER_NO",
      value: itemJob.LENDER_NO,
    },
    {
      name: "LENDER_DATE",
      value: convertDateTime(itemJob.LENDER_DATE),
    },
    {
      name: "DOR_NO",
      value: itemJob.DOR_NO,
    },
    {
      name: "CUST_NO",
      value: itemJob.CUST_NO,
    },
    {
      name: "CUST_NAME",
      value: itemJob.CUST_NAME,
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
      name: "CONTAINER_QTY",
      value: itemJob.CONTAINER_QTY,
    },
    {
      name: "TOTAL_AMT",
      value: itemJob.TOTAL_AMT,
    },
    {
      name: "LEND_REASON",
      value: itemJob.LEND_REASON,
    },
    {
      name: "sum_PORT_AMT",
      value:
        parseInt(itemJob.sum_PORT_AMT) +
        parseInt(itemJob.sum_INDUSTRY_ZONE_AMT),
    },
    {
      name: "UNG_AMT",
      value: sum,
    },
    {
      name: "BU_TRA",
      value: buTra < 0 ? buTra * -1 : buTra,
    },
  ];

  var newIndex = 0;

  const getIndexEdit = (index) => {
    newIndex = index;
    return newIndex;
  };

  const fields2 = [{ name: "data", value: [...itemJobD] }];

  const onFinish2 = (values) => {
    const form = new FormData();
    var item = values.data[newIndex];
    form.append("LENDER_NO", itemJob.LENDER_NO);
    form.append("LENDER_AMT", item.LENDER_AMT);
    form.append("NOTE", item.NOTE);
    form.append("BRANCH_ID", localStorage.getItem("BRANCH_ID"));
    if (item.INPUT_USER) {
      form.append("INPUT_USER", item.INPUT_USER);
      form.append("MODIFY_USER", localStorage.getItem("USER_NO"));
      form.append("SER_NO", item.SER_NO);
      api("payment/lender/edit-d", "POST", form).then((res) =>
        openNotificationWithIcon("success", "Thành công", "Cập nhật thành công")
      );
    } else {
      form.append("INPUT_USER", localStorage.getItem("USER_NO"));
      api("payment/lender/add-d", "POST", form).then((res) => {
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
      width="1000px"
      footer={[]}
      onCancel={closeTest}
    >
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        fields={fields}
        // onValuesChange={onChange}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="Job No" name="JOB_NO">
              <Input disabled />
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
                // onChange={onChange}
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
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="Tổng tiền Job đã sử dụng" name="sum_PORT_AMT">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                disabled
                style={{ color: "red", fontWeight: "bold" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Tổng tiền Ứng" name="UNG_AMT">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                disabled
                style={{ color: "red", fontWeight: "bold" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={buTra < 0 ? "Tiền Bù" : "Tiền Trả"} name="BU_TRA">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                disabled
                style={{ color: "red", fontWeight: "bold" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ borderTop: "1px solid #096dd9" }} />
      <Form fields={fields2} onFinish={onFinish2} form={form}>
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
                      name={[field.name, "LENDER_AMT"]}
                      fieldKey={[field.key, "LENDER_AMT"]}
                      label="Tiền Ứng"
                    >
                      <InputNumber
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        // style={{ width: 130 }}
                        style={{ width: 200 }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "NOTE"]}
                      fieldKey={[field.key, "NOTE"]}
                      label="Ghi Chú"
                    >
                      <Input style={{ width: 200 }} />
                    </Form.Item>
                    {/* <Form.Item
                      {...field}
                      name={[field.name, "INPUT_USER"]}
                      fieldKey={[field.key, "INPUT_USER"]}
                      label="Người Tạo"
                    >
                      <Input disabled style={{ width: 200 }} />
                    </Form.Item> */}
                    <Form.Item
                      {...field}
                      name={[field.name, "SER_NO"]}
                      fieldKey={[field.key, "SER_NO"]}
                      hidden
                    >
                      <Input />
                    </Form.Item>
                    {/* <Form.Item
                      {...field}
                      name={[field.name, "MODIFY_USER"]}
                      fieldKey={[field.key, "MODIFY_USER"]}
                      label="Người Sửa"
                    >
                      <Input disabled style={{ width: 200 }} />
                    </Form.Item> */}
                    <Button
                      htmlType="submit"
                      icon={<CheckCircleOutlined />}
                      type="link"
                      onClick={() => getIndexEdit(index)}
                    />
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

export default ModalEditPayment;
