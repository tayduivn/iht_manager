import React, { Fragment, useEffect, useState } from "react";
import { Input, Form, Spin } from "antd";
import api from "../../utils/api";
import "./InformationCompany.css";
import { useDispatch, useSelector } from "react-redux";
import { actHideLoading, actShowLoading } from "../../actions/actionLoading";

const InformationCompany = () => {
  const dispatch = useDispatch();
  const showSpin = () => dispatch(actShowLoading());
  const hideSpin = () => dispatch(actHideLoading());

  const [state, setState] = useState({});
  const getInformation = () => {
    api("data-basic/company", "GET", null).then((res) => {
      if (res.status === 200) {
        if (res.data.success === true) {
          setState(res.data.data[0]);
          hideSpin();
        }
      }
    });
  };

  const spin = useSelector((state) => state.isLoading);

  useEffect(() => {
    showSpin();
    getInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  return (
    <Fragment>
      {/* {state} */}
      <div style={{ textAlign: "center" }}>
        <h1>Thông Tin Công Ty</h1>
      </div>

      <Spin size="large" spinning={spin}>
        <Form {...layout}>
          <Form.Item label="Mã Công Ty (Company NO)">
            <Input
              size="small"
              style={{ width: 250 }}
              disabled
              value={state.COMP_NO}
            />
          </Form.Item>
          <Form.Item label="Tên Công Ty (Company Name)">
            <Input
              size="small"
              style={{ width: 250 }}
              disabled
              value={state.COMP_NAME}
            />
          </Form.Item>
          <Form.Item label="Tên Công Ty (Orther Name)">
            <Input
              size="small"
              style={{ width: 250 }}
              disabled
              value={state.COMP_CNAME}
            />
          </Form.Item>
          <Form.Item label="Địa Chỉ Công Ty 1 (Address 1)">
            <Input
              size="small"
              style={{ width: 500 }}
              disabled
              value={state.COMP_ADDRESS1}
            />
          </Form.Item>
          <Form.Item label="Địa Chỉ Công Ty 2 (Address 2)">
            <Input
              size="small"
              style={{ width: 500 }}
              disabled
              value={state.COMP_ADDRESS2}
            />
          </Form.Item>
          <Form.Item label="Điện Thoại 1 (Telephone No 1)">
            <Input
              size="small"
              style={{ width: 250 }}
              disabled
              value={state.COMP_TEL1}
            />
          </Form.Item>
          <Form.Item label="Điện Thoại 2 (Telephone No 2)">
            <Input
              size="small"
              style={{ width: 250 }}
              disabled
              value={state.COMP_TEL2}
            />
          </Form.Item>
          <Form.Item label="Số Fax 1 (Fax Number 1)">
            <Input
              size="small"
              style={{ width: 250 }}
              disabled
              value={state.COMP_FAX1}
            />
          </Form.Item>
          <Form.Item label="Số Fax 2 (Fax Number 2)">
            <Input
              size="small"
              style={{ width: 250 }}
              disabled
              value={state.COMP_FAX2}
            />
          </Form.Item>
          <Form.Item label="Mã Số Thuế (Tax No)">
            <Input
              size="small"
              style={{ width: 250 }}
              disabled
              value={state.COMP_TAX}
            />
          </Form.Item>
        </Form>
      </Spin>
    </Fragment>
  );
};

export default InformationCompany;
