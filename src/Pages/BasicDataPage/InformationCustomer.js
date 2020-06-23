import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actFectCustomersRequeset, actOpenDrawer } from "../../actions/index";
import TableCustom from "../../components/Table";
import { Space, Button } from "antd";
import "./InformationCompany.css";
import Search from "../../components/Search/index";
import DrawerCustom from "../../components/Drawer";

const InformationCustomer = () => {
  const customers = useSelector((state) => state.getData);
  const dispatch = useDispatch();
  const fetchCustomers = () => dispatch(actFectCustomersRequeset());
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
        <Space size="middle">
          {/* <a href=' '>Invite {record.name}</a> */}
          <Button
            type="primary"
            onClick={(e) => {
              openDrawer();
              // console.log(record.CUST_NO);
            }}
          >
            Xem
          </Button>
        </Space>
      ),
    },
  ];

  const searchs = [
    {
      label: "Loại (Kinds)",
      selects: [
        {
          text: "Mã Khách Hàng",
          value: "CUST_TYPE",
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

  return (
    <Fragment>
      {Search(searchs)}
      {TableCustom(customers, columns)}
      {DrawerCustom()}
    </Fragment>
  );
};

export default InformationCustomer;
