import React, { Fragment, useEffect } from "react";
import Search from "../../components/Search";
import { useSelector, useDispatch } from "react-redux";
import {
  actFetchPaymentsRequeset,
  actOpenDrawer,
  actGetPaymentRequeset,
} from "../../actions";
import { Space, Button } from "antd";
import TableCustom from "../../components/Table";
import DrawerCustom from "../../components/Drawer";
import _ from "lodash";

const Payment = () => {
  const payments = useSelector((state) => state.payments);
  const itemPayment = useSelector((state) => state.itemCustomer);
  const staffs = useSelector((state) => state.staffs);
  const dispatch = useDispatch();
  const fetchPayments = () => dispatch(actFetchPaymentsRequeset());
  const getPayment = (LENDER_NO) => dispatch(actGetPaymentRequeset(LENDER_NO));
  const openDrawer = () => dispatch(actOpenDrawer());

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const columns = [
    {
      title: "Advance No",
      dataIndex: "LENDER_NO",
      key: "LENDER_NO",
    },
    {
      title: "Type",
      dataIndex: "LENDER_NAME",
      key: "LENDER_NAME",
    },
    {
      title: "JOB NO",
      dataIndex: "JOB_NO",
      key: "JOB_NO",
    },
    {
      title: "",
      key: "LENDER_NO",
      render: (text, record) => (
        <>
          <Space size="middle">
            <Button
              type="primary"
              onClick={(e) => {
                openDrawer();
                getPayment(record.LENDER_NO);
              }}
            >
              Xem
            </Button>
          </Space>
        </>
      ),
    },
  ];

  const fields = [
    {
      name: "LENDER_NO",
      value: itemPayment.LENDER_NO,
      label: "Advance No",
      disabled: true,
    },
    {
      name: "LENDER_NAME",
      value: itemPayment.LENDER_NAME,
      label: "Type",
      select: true,
    },
    {
      name: "LENDER_DATE",
      value: itemPayment.LENDER_DATE,
      label: "Date",
      disabled: true,
    },

    {
      name: "PNL_NO",
      value: itemPayment.PNL_NO,
      label: "Advance Staff",
      select: true,
      dataSelect: staffs,
    },
    {
      name: "DOR_NO",
      value: itemPayment.DOR_NO,
      label: "Kinds of Money",
      select: true,
    },
    { name: "JOB_NO", value: itemPayment.JOB_NO, label: "Job No" },
    {
      name: "CUST_NAME",
      value: itemPayment.CUST_NAME,
      label: "Customer",
      disabled: true,
    },
    {
      name: "ORDER_FROM",
      value: itemPayment.ORDER_FROM,
      label: "Order From",
      disabled: true,
    },
    {
      name: "ORDER_TO",
      value: itemPayment.ORDER_TO,
      label: "Order To",
      disabled: true,
    },
    {
      name: "TOTAL_AMT",
      value: itemPayment.TOTAL_AMT,
      label: "Amount To",
    },
    {
      name: "LEND_REASON",
      value: itemPayment.LEND_REASON,
      label: "Reasons",
    },
  ];

  const onFinish = (values) => {
    // const form = new FormData();
    console.log(values);
    var data = _.find(staffs, { PNL_NO: values });
    if (data === undefined) {
      return null;
    } else {
      console.log(data.PNL_NAME);
    }
  };
  return (
    <Fragment>
      {Search(searchs)}
      {TableCustom(payments, columns)}
      {DrawerCustom(fields, itemPayment, onFinish)}
    </Fragment>
  );
};

export default Payment;
