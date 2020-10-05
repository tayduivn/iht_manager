import React, { Fragment, useEffect, useState } from "react";
import TableCustom from "../../components/Table";
import { Space, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  actGetPaymentDebitRequest,
  actOpenModalEdit,
  actGetDebitDesRequest, actSearchAllDebitRequest
} from "../../actions";
import SearchApi from "../../components/Search/SearchApi";
import ModalPaymentDebit from "../../components/Modal/ModalPaymentDebit";
import ModalEditPaymentDebit from "../../components/Modal/ModalEditPaymenDebit";
import { convertDateTime } from "../../utils/help";

const PaymentRequest = () => {
  const paymentDebit = useSelector((state) => state.paymentDebit);
  const dispatch = useDispatch();
  const fetchPaymentDebit = () => dispatch(actGetPaymentDebitRequest());
  const openModalEdit = () => dispatch(actOpenModalEdit());
  const getJobOrder = (JOB_NO) => dispatch(actGetDebitDesRequest(JOB_NO));

  const itemJob = useSelector((state) => state.itemCustomer);


  const [state, setState] = useState(true);

  useEffect(() => {
    fetchPaymentDebit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Job No",
      dataIndex: "JOB_NO",
      key: "JOB_NO",
    },
    {
      title: "Debit Date",
      dataIndex: "DEBIT_DATE",
      key: "DEBIT_DATE",
      render: text => convertDateTime(text)
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
                getJobOrder(record.JOB_NO);
                setState(false);
                openModalEdit();
              }}
            >
              Xem
            </Button>
          </Space>
        </>
      ),
    },
  ];

  const changeEdit = () => {
    setState(true);
  };

  const onSearch = (values) => {
    if (values.keyword) {
      dispatch(actSearchAllDebitRequest(values.type, values.keyword));
    } else {
      fetchPaymentDebit();
    }
  };

  return (
    <Fragment>
      {SearchApi(onSearch, state)}
      {TableCustom(paymentDebit, columns)}
      {state === false ? (
        <ModalEditPaymentDebit changeEdit={changeEdit} itemJob={itemJob} />
      ) : (
        <ModalPaymentDebit />
      )}
    </Fragment>
  );
};

export default PaymentRequest;
