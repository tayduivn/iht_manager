import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchJobsRequest, actSearchAllRequest } from "../../actions";
import {
  Space,
  Button,
  Modal,
  Row,
  Col,
  Form,
  Input,
  Checkbox,
  Divider,
} from "antd";
import TableCustom from "../../components/Table";
import SearchApi from "../../components/Search/SearchApi";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const CreateJobOrder = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs);
  const fetchJobs = () => dispatch(actFetchJobsRequest());

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState(false);

  const showModal = () => {
    setState(true);
  };

  const handleOk = (e) => {
    console.log(e);
    setState(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setState(false);
  };

  const columns = [
    {
      title: "Job No",
      dataIndex: "JOB_NO",
      key: "JOB_NO",
    },
    {
      title: "Customer Name",
      dataIndex: "CUST_NAME",
      key: "CUST_NAME",
    },
    {
      title: "",
      key: "JOB_NO",
      render: (text, record) => (
        <>
          <Space size="middle">
            <Button
              type="primary"
              onClick={(e) => {
                showModal();
              }}
            >
              Xem
            </Button>
          </Space>
        </>
      ),
    },
  ];

  const onSearch = (values) => {
    if (values.keyword) {
      dispatch(actSearchAllRequest(values.type, values.keyword));
    } else {
      fetchJobs();
    }
  };

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <Fragment>
      {SearchApi(onSearch)}
      {TableCustom(jobs, columns)}
      <Modal title="Thông tin" visible={state} width="900px">
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="Job No" name='JOB_NO'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Order Date">
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Duyệt">
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Approve Date">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="Customer No">
                <Input />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="Consignee">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Shipper">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Bill No">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="Order From">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Order To">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Số tờ khai">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="Customer Date">
                <Input />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item label="Invoice No">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Container No">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="Container Qty">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="New Weight">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="GW">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="POL">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="POD">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="ETD/ETA">
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
              <Form.Item label="Ghi Chú">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Form.List name="users">
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
                        {...field}
                        name={[field.name, "first"]}
                        fieldKey={[field.fieldKey, "first"]}
                        rules={[
                          { required: true, message: "Missing first name" },
                        ]}
                      >
                        <Input placeholder="First Name" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "last"]}
                        fieldKey={[field.fieldKey, "last"]}
                        rules={[
                          { required: true, message: "Missing last name" },
                        ]}
                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>

                      <MinusCircleOutlined
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
                    <Button
                      type="submit"
                     htmlType='submit'
                    >
                      <PlusOutlined />
                    </Button>
                  </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default CreateJobOrder;
