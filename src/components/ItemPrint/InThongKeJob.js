import React, { useEffect } from "react";
import { Typography, Form, Button, Row, Col, Select, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { actFetchInformationUser, actFetchStaffsRequest } from "../../actions";

const { Title } = Typography;

const { Option } = Select;

export default function InThongKeJob() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers);
  const fetchInformationUser = () => dispatch(actFetchInformationUser());
  const fetchStaff = () => dispatch(actFetchStaffsRequest());
  const informationUser = useSelector((state) => state.informationUser);
  useEffect(() => {
    fetchStaff();
    fetchInformationUser();
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

    if (values.SELECT === "1") {
      window.open(
        `https://job-api.ihtvn.com/api/v1/print/file/statistic/created-job/cust=${values.CUST_NO}&user=undefined&fromdate=${from}&todate=${to}`
      );
    } else if (values.SELECT === "2") {
      window.open(
        `https://job-api.ihtvn.com/api/v1/print/file/statistic/user-import-job/cust=undefined&user=${
          values.JOB_NO === undefined ? null : values.JOB_NO
        }&fromdate=${from}&todate=${to}`
      );
    }
  }

  return (
    <>
      <Title level={4} style={{ color: "red" }}>
        In Thống Kê Job
      </Title>
      <Form onFinish={onFinishJobOrder}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="Loại Report" name="SELECT">
              <Select>
                <Option key="1">Thống Kê Tạo Job</Option>
                <Option key="2">Thống Kê NV Nhập Job Order</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Mã Khách Hàng" name="CUST_NO">
              <Select
                placeholder="Chọn Mã Khách Hàng"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Nhân Viên" name="JOB_NO">
              <Select
                placeholder="Danh Sách Nhân Viên"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {informationUser.map((item, index) => {
                  return (
                    <Option key={index} value={item.USER_NO}>
                      {item.USER_NAME}
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
