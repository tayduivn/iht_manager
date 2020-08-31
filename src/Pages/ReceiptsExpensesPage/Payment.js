import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  actFetchPaymentsRequeset,
  actOpenDrawer,
  actGetPaymentRequeset,
  actSearchAllRequest,
} from "../../actions";
import { Space, Button } from "antd";
import TableCustom from "../../components/Table";
import SearchApi from '../../components/Search/SearchApi'
import ModalPayment from "../../components/Modal/ModalPayment";

const Payment = () => {
  const payments = useSelector((state) => state.payments);
  const itemPayment = useSelector((state) => state.itemCustomer);
  const itemJobPayment = useSelector((state) => state.itemJobPayment);
  const dispatch = useDispatch();
  const fetchPayments = () => dispatch(actFetchPaymentsRequeset());
  const getPayment = (LENDER_NO) => dispatch(actGetPaymentRequeset(LENDER_NO));
  const openDrawer = () => dispatch(actOpenDrawer());

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  console.log(itemJobPayment);

  const onSearch = (values) => {
    if (values.keyword) {
      dispatch(actSearchAllRequest(values.type, values.keyword));
    } else {
      fetchPayments();
    }
  };

  const [state, setState] = useState(true)
  const changeEdit = () => {
    setState(true)
  }

  let pay = 'payment'


  return (
    <Fragment>
      {SearchApi(onSearch, state,  pay)}
      {TableCustom(payments, columns)}
      {state === false ? <ModalPayment changeEdit={changeEdit} itemJob={itemPayment}/> : <ModalPayment />}
    </Fragment>
  );
};

export default Payment;
