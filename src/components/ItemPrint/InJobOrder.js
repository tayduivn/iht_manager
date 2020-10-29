import React from "react";
import { Typography, Form, Button, Row, Col, Select, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { actactListJobsOfCustomerRequest } from "../../actions";

const { Title } = Typography;

const { Option } = Select;

export default function InJobOrder() {
  const dispatch = useDispatch();
  const dropdown = useSelector((state) => state.dropdown);
  const listOfCustomer = useSelector((state) => state.listJobOfCustomer);
  const fetchListOfCustomer = (CUST_NO) =>
    dispatch(actactListJobsOfCustomerRequest(CUST_NO));


  function onFinishJobOrder(values) {
    if (values.SELECT === "1") {
      window.open(
        `https://job-api.ihtvn.com/api/v1/print/file/job-order/jobno=${values.JOB_NO}`
      );
    } else if (values.SELECT === "2") {
      window.open(
        `https://job-api.ihtvn.com/api/v1/print/file/job-order/custno=${
          values.CUST_NO
        }&jobno=${values.JOB_NO.toString()}`
      );
    } else {
      var yearFrom = values.FROM_DATE.slice(0, 4);
      var dayFrom = values.FROM_DATE.slice(5, 7);
      var monthFrom = values.FROM_DATE.slice(8, 10);

      var yearTo = values.TO_DATE.slice(0, 4);
      var dayTo = values.TO_DATE.slice(5, 7);
      var monthTo = values.TO_DATE.slice(8, 10);

      window.open(
        `https://job-api.ihtvn.com/api/v1/print/file/job-order/fromdate=${
          yearFrom + monthFrom + dayFrom
        }&todate=${yearTo + monthTo + dayTo}`
      );
    }
  }

  function onChangeKH(value) {
    fetchListOfCustomer(value);
  }
  return (
    <>
      <Title level={4} style={{ color: "red" }}>
        In Job Order
      </Title>
      <Form onFinish={onFinishJobOrder}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="Loại Báo Biểu" name="SELECT">
              <Select>
                <Option key="1">Job Order</Option>
                <Option key="2">Khách Hàng</Option>
                <Option key="3">Ngày Job</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.SELECT !== currentValues.SELECT
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("SELECT") === "1" ? (
                  <Form.Item label="Mã Job" name="JOB_NO">
                    <Select
                      placeholder="Chọn Job"
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {dropdown.job_order.map((item, index) => {
                        return (
                          <Option key={index} value={item.JOB_NO}>
                            {item.JOB_NO}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={14}>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.SELECT !== currentValues.SELECT
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("SELECT") === "2" ? (
                  <Form.Item label="Mã Khách Hàng" name="CUST_NO">
                    <Select
                      placeholder="Chọn Mã Khách Hàng"
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={onChangeKH}
                    >
                      {dropdown.customer.map((item, index) => {
                        return (
                          <Option key={index} value={item.CUST_NO}>
                            {item.CUST_NO + " | " + item.CUST_NAME}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={14}>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.SELECT !== currentValues.SELECT
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("SELECT") === "2" ? (
                  <Form.Item label="Job No" name="JOB_NO">
                    <Select
                      placeholder="Danh Sách Job"
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      mode="multiple"
                    >
                      {listOfCustomer.map((item, index) => {
                        return (
                          <Option key={index} value={item.JOB_NO}>
                            {item.JOB_NO}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.SELECT !== currentValues.SELECT
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("SELECT") === "3" ? (
                  <Form.Item label="From Date" name="FROM_DATE">
                    <Input type="date" />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.SELECT !== currentValues.SELECT
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("SELECT") === "3" ? (
                  <Form.Item label="To Date" name="TO_DATE">
                    <Input type="date" />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginLeft: 10, width: 100 }}
        >
          Xem
        </Button>
      </Form>
    </>
  );
}
