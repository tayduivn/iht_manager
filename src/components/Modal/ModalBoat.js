import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actCloseModal, actFetchCustomersRequeset } from "../../actions";
import { Form, Input, Button, Space, Modal, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function ModalBoat() {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(actCloseModal());
  const stateModal = useSelector((state) => state.isDrawer);
  const fetchCustomers = () => dispatch(actFetchCustomersRequeset());
  const customers = useSelector((state) => state.customers);

  const itemBoatCont = useSelector((state) => state.itemBoatCont);

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values) => {
    console.log(values);
  };

  const fields = [{ name: "data", value: itemBoatCont }];

  return (
    <Modal
      title="Thông tin"
      visible={stateModal}
      width="1300px"
      footer={[]}
      onCancel={closeModal}
    >
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        fields={fields}
      >
        <Form.List name="data">
          {(fields, { add, remove }) => {
            return (
              <div style={{ overflowX: "scroll" }}>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                      width: "2000px",
                    }}
                    align="start"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "JOB_NO"]}
                      fieldKey={[field.fieldKey, "JOB_NO"]}
                      label="Job No"
                    >
                      <Input placeholder="Job No" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "BOAT_LEAVE_DATE"]}
                      fieldKey={[field.fieldKey, "BOAT_LEAVE_DATE"]}
                      label="Boat Leave Date"
                    >
                      <Input type="date" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "PAY_DATE"]}
                      fieldKey={[field.fieldKey, "PAY_DATE"]}
                      label="Pay Date"
                    >
                      <Input type="date" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "PAY_NOTE"]}
                      fieldKey={[field.fieldKey, "PAY_NOTE"]}
                      label="Pay Note"
                    >
                      <Input placeholder="Pay Note" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "CUST_NO"]}
                      fieldKey={[field.fieldKey, "CUST_NO"]}
                      label="Mã Khách Hàng"
                    >
                      <Select
                        style={{ width: 200 }}
                        placeholder="Mã Khách Hàng"
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {customers.map((item, index) => {
                          return (
                            <Option key={index} value={item.CUST_NO}>
                              {item.CUST_NO + " | " + item.CUST_NAME}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "ORDER_FROM"]}
                      fieldKey={[field.fieldKey, "ORDER_FROM"]}
                      label="Order From"
                    >
                      <Input placeholder="Order From" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "ORDER_TO"]}
                      fieldKey={[field.fieldKey, "ORDER_TO"]}
                      label="Order To"
                    >
                      <Input placeholder="Order To" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "VND_FEE"]}
                      fieldKey={[field.fieldKey, "VND_FEE"]}
                      label="VND Fee"
                    >
                      <Input placeholder="VND Fee" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "USD_FEE"]}
                      fieldKey={[field.fieldKey, "USD_FEE"]}
                      label="USD Fee"
                    >
                      <Input placeholder="USD Fee" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "PAID_VND_FEE"]}
                      fieldKey={[field.fieldKey, "PAID_VND_FEE"]}
                      label="PAID_VND_FEE"
                    >
                      <Input placeholder="PAID_VND_FEE" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "PAID_USD_FEE"]}
                      fieldKey={[field.fieldKey, "PAID_USD_FEE"]}
                      label="PAID_USD_FEE"
                    >
                      <Input placeholder="PAID_USD_FEE" />
                    </Form.Item>
                    <PlusOutlined
                      style={{ marginTop: 40 }}
                      onClick={() => {
                        console.log("test");
                      }}
                    />
                    <MinusCircleOutlined
                      style={{ marginTop: 40 }}
                      onClick={() => {
                        remove(field.name);
                      }}
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
