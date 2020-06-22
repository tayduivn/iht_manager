import React, { useEffect } from "react";
import { Table  } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { actFectCustomersRequeset } from "../../actions/index";

const InformationCustomer = () => {
  const customers = useSelector((state) => state.getData);
  const dispatch = useDispatch();
  const fetchCustomers = () => dispatch(actFectCustomersRequeset());

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
      title: "Địa Chỉ",
      dataIndex: "CUST_ADDRESS",
      key: "CUST_ADDRESS",
    },
  ];

  return (
    <Table
      rowKey={"CUST_NO"}
      dataSource={customers }
      columns={columns}
      pagination
    />
  );
};

export default InformationCustomer;
