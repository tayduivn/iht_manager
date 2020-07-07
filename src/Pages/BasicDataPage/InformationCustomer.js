import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  actFetchCustomersRequeset,
  actOpenDrawer,
  actGetCustomerRequeset,
} from "../../actions/index";
import TableCustom from "../../components/Table";
import { Space, Button } from "antd";
import "./InformationCompany.css";
import Search from "../../components/Search/index";
import DrawerCustom from "../../components/Drawer";
import api from "../../utils/api";

const InformationCustomer = () => {
  const customers = useSelector((state) => state.customers);
  const itemCustomer = useSelector((state) => state.itemCustomer);
  const dispatch = useDispatch();
  const fetchCustomers = () => dispatch(actFetchCustomersRequeset());
  const getCustomer = (CUST_NO) => dispatch(actGetCustomerRequeset(CUST_NO));
  const openDrawer = () => dispatch(actOpenDrawer());

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
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
      title: "Điện Thoại 1",
      dataIndex: "CUST_TEL1",
      key: "CUST_TEL1",
    },
    {
      title: "",
      key: "CUST_NO",
      render: (text, record) => (
        <>
          <Space size="middle">
            <Button
              type="primary"
              onClick={(e) => {
                openDrawer();
                getCustomer(record.CUST_NO);
              }}
            >
              Xem
            </Button>
          </Space>
        </>
      ),
    },
  ];

  const searchs = [
    {
      label: "Loại (Kinds)",
      selects: [
        {
          text: "Mã Khách Hàng",
          value: "CUST_NO",
        },
        {
          text: "Tên Khách Hàng",
          value: "CUST_NAME",
        },
      ],
    },
    {
      label: "Nội Dung (Contents)",
    },
  ];

  const fields = [
    {
      name: "CUST_NO",
      value: itemCustomer.CUST_NO,
      label: "Mã Khách Hàng",
    },
    {
      name: "CUST_NAME",
      value: itemCustomer.CUST_NAME,
      label: "Tên Khách Hàng",
    },
    {
      name: "CUST_CNAME",
      value: itemCustomer.CUST_CNAME,
      label: "Tên Khách Hàng 2",
    },
    { name: "TEN_DON_VI", value: itemCustomer.TEN_DON_VI, label: "Tên Đơn Vị" },
    {
      name: "CUST_ADDRESS",
      value: itemCustomer.CUST_ADDRESS,
      label: "Địa Chỉ",
      area: true,
    },
    {
      name: "CUST_TEL1",
      value: itemCustomer.CUST_TEL1,
      label: "Điện Thoại 1",
    },
    { name: "CUST_TEL2", value: itemCustomer.CUST_TEL2, label: "Điện Thoại 2" },
    { name: "CUST_FAX", value: itemCustomer.CUST_FAX, label: "Số Fax" },
    { name: "CUST_TAX", value: itemCustomer.CUST_TAX, label: "Mã Số Thuế" },
    { name: "CUST_BOSS", value: itemCustomer.CUST_TAX, label: "Người Liên Hệ" },
  ];

  const onFinish = (values) => {
    const form = new FormData();
console.log(values)
    form.append("CUST_NO", values.CUST_NO);
    form.append("CUST_NAME", values.CUST_NAME);
    form.append("CUST_CNAME", values.CUST_CNAME);
    form.append("CUST_ADDRESS", values.CUST_ADDRESS);
    form.append("CUST_TEL1", values.CUST_TEL1);
    form.append("CUST_TEL2", values.CUST_TEL2);
    form.append("CUST_FAX", values.CUST_FAX);
    form.append("CUST_TAX", values.CUST_TAX);
    form.append("CUST_BOSS", values.CUST_BOSS);
    form.append("TEN_DON_VI", values.TEN_DON_VI);
    form.append("BRANCH_ID", localStorage.getItem("BRANCH_ID"));
    form.append("INPUT_USER", localStorage.getItem("USER_NO"));
    api("data-basic/customer/add", "POST", form).then((res) =>
      console.log(res)
    );
  };

  return (
    <Fragment>
      {Search(searchs)}
      {TableCustom(customers, columns)}
      {DrawerCustom(fields, itemCustomer, onFinish)}
    </Fragment>
  );
};

export default InformationCustomer;
