import React, { useEffect } from "react";
import { Typography, Form, Button, Row, Col, Select, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { actDropDownAgentRequest, actDropDownCarrieRequest, actDropDownJobOrderRequest } from "../../actions/actionDropDownList";

const { Title } = Typography;

const { Option } = Select;

export default function InRefund() {
  const dispatch = useDispatch();
  const fetchCarriers = () => dispatch(actDropDownCarrieRequest());
  const fetchJobs = () => dispatch(actDropDownJobOrderRequest());
  const dropdown = useSelector((state) => state.dropdown);
  const fetchAgents = () => dispatch(actDropDownAgentRequest());

  useEffect(() => {
    fetchCarriers();
    fetchJobs();
    fetchAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onFinishJobOrder(values) {
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

    window.open(
      `https://job-api.ihtvn.com/api/v1/print/file/refund/type=${values.SELECT}&custno=${values.CUST_NO}&jobno=${values.JOB_NO}&fromdate=${from}&todate=${to}}`
    );
  }

  return (
    <>
      <Title level={4} style={{ color: "red" }}>
        Báo Biểu Refund
      </Title>
      <Form onFinish={onFinishJobOrder}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="Loại" name="SELECT">
              <Select>
                <Option key="1">Refund Hãng Tàu</Option>
                <Option key="2">Refund Khách Hàng</Option>
                <Option key="3">Refund Đại Lý</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={10}>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.SELECT !== currentValues.SELECT
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("SELECT") === "1" ? (
                  <Form.Item label="Hãng Tàu" name="CUST_NO">
                    <Select
                      placeholder="Chọn Hãng Tàu"
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {dropdown.carrier.map((item, index) => {
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
                getFieldValue("SELECT") === "3" ? (
                  <Form.Item label="Đại Lý" name="CUST_NO">
                    <Select
                      placeholder="Chọn Đại Lý"
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {dropdown.agent.map((item, index) => {
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
          <Col span={10}>
            <Form.Item label="Job No" name="JOB_NO">
              <Select
                placeholder="Danh Sách Job"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {dropdown.job_order.map((item, index) => {
                  return (
                    <Option key={index} value={item.JOB_NO}>
                      {item.JOB_NO + "  |  " + item.CUST_NAME}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="From Date" name="FROM_DATE">
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="To Date" name="TO_DATE">
              <Input type="date" />
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
