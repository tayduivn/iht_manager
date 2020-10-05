import React, { Fragment, useEffect, useState } from "react";
import { Col, Form, Input, Row, Select, Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  actGetPaymentDebitRequest,
  actFetchCustomersRequeset,
} from "../../actions";
import api from "../../utils/api";
import { convertDateTime } from "../../utils/help";

const { Option } = Select;

const FindData = () => {
  const [state, setState] = useState([]);

  const dispatch = useDispatch();
  const fetchPaymentDebit = () => dispatch(actGetPaymentDebitRequest());
  const fetchCustomers = () => dispatch(actFetchCustomersRequeset());
  const paymentDebit = useSelector((state) => state.paymentDebit);
  const customers = useSelector((state) => state.customers);
  useEffect(() => {
    fetchPaymentDebit();
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values) => {
    var from = undefined;
    var to = undefined;
    if (values.FROM_DATE && values.TO_DATE) {
      var yearFrom = values.FROM_DATE.slice(0, 4);
      var dayFrom = values.FROM_DATE.slice(5, 7);
      var monthFrom = values.FROM_DATE.slice(8, 10);

      var yearTo = values.TO_DATE.slice(0, 4);
      var dayTo = values.TO_DATE.slice(5, 7);
      var monthTo = values.TO_DATE.slice(8, 10);

      from = yearFrom + monthFrom + dayFrom;
      to = yearTo + monthTo + dayTo;
    }
    var form = new FormData();
    form.append("TYPE", values.TYPE);
    form.append("JOB_NO", values.JOB_NO);
    form.append("CUST_NO", values.CUST_NO);
    form.append("TO_DATE", to);
    form.append("FROM_DATE", from);
    api("payment/check-data", "POST", form).then((res) =>
      setState(res.data.data)
    );
  };

  const columns = [
    {
      title: "Job No",
      dataIndex: "JOB_NO",
      key: "JOB_NO",
    },
    {
      title: "Mã Khách Hàng",
      dataIndex: "CUST_NO",
      key: "CUST_NO",
    },
    {
      title: "Tên Khách Hàng",
      dataIndex: "CUST_NAME",
      key: "CUST_NAME",
    },
    {
      title: "From",
      dataIndex: "TRANS_FROM",
      key: "TRANS_FROM",
    },
    {
      title: "To",
      dataIndex: "TRANS_TO",
      key: "TRANS_TO",
    },
    {
      title: "Thanh Toán",
      dataIndex: "PAYMENT_CHK",
      key: "PAYMENT_CHK",
      render: (text) => (text === "N" ? "Chưa Thanh Toán" : "Đã Thanh Toán"),
    },
    {
      title: "Ngày Thanh Toán",
      dataIndex: "PAYMENT_DATE",
      key: "PAYMENT_DATE",
      render: (text) => convertDateTime(text),
    },
  ];

  return (
    <Fragment>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
      >
        <Form.Item label="Loại Tra Cứu" name="TYPE">
          <Select style={{ width: 200 }} placeholder="Chọn">
            <Option key="1">Chưa Thanh Toán</Option>
            <Option key="2">Đã Thanh Toán</Option>
            <Option key="3">Tất Cả</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Số Job" name="JOB_NO">
          <Select
            style={{ width: 200 }}
            placeholder="Chọn Job"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {paymentDebit.map((item, index) => {
              return (
                <Option key={index} value={item.JOB_NO}>
                  {item.JOB_NO + " | " + item.CUST_NO}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Mã Khách Hàng" name="CUST_NO">
          <Select
            style={{ width: 200 }}
            placeholder="Chọn Mã Khách Hàng"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="Từ Ngày" name="TO_DATE">
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Đến Ngày" name="FROM_DATE">
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              // onClick={() => {
              //   closeModal();
              // }}
            >
              Tra Dữ Liệu
            </Button>
          </Col>
        </Row>
      </Form>
      <Table
        dataSource={state}
        rowKey={columns[0].key.toString()}
        columns={columns}
      />
    </Fragment>
  );
};

export default FindData;
