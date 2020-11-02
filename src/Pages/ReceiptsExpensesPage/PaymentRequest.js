import React, { Fragment, useEffect, useState } from "react";
import TableCustom from "../../components/Table";
import { Space, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  actPaymentDebit,
  actOpenModalEdit,
  actGetDebitDesRequest,
  actSearchAllDebitRequest,
} from "../../actions";
import SearchApi from "../../components/Search/SearchApi";
import ModalPaymentDebit from "../../components/Modal/ModalPaymentDebit";
import ModalEditPaymentDebit from "../../components/Modal/ModalEditPaymenDebit";
import { convertDateTime } from "../../utils/help";
import { actHideLoading, actShowLoading } from "../../actions/actionLoading";
import api from "../../utils/api";

const PaymentRequest = () => {
  const [total, setTotal] = useState(1);
  const paymentDebit = useSelector((state) => state.paymentDebit);
  const dispatch = useDispatch();
  const listPaymentDebit = (data) => dispatch(actPaymentDebit(data));
  const openModalEdit = () => dispatch(actOpenModalEdit());
  const getJobOrder = (JOB_NO) => dispatch(actGetDebitDesRequest(JOB_NO));

  const itemJob = useSelector((state) => state.itemCustomer);

  const showLoading = () => dispatch(actShowLoading());
  const hideLoading = () => dispatch(actHideLoading());

  const fetchPaymentDebit = () => {
    showLoading();
    api("payment/debit-note/page=1", "GET", null).then((res) => {
      if (res.status === 200) {
        listPaymentDebit(res.data.data);
        setTotal(res.data.total_page);
        hideLoading();
      }
    });
  };

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
      render: (text) => convertDateTime(text),
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
            <Button type="primary" danger>
              Xóa
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

  const changePage = (page) => {
    showLoading();
    api(`payment/debit-note/page=${page}`, "GET", null).then((res) => {
      if (res.status === 200) {
        listPaymentDebit(res.data.data);
        hideLoading();
      }
    });
  };

  return (
    <Fragment>
      {SearchApi(onSearch, state)}
      {TableCustom(paymentDebit, columns, total, changePage)}
      {state === false ? (
        <ModalEditPaymentDebit changeEdit={changeEdit} itemJob={itemJob} />
      ) : (
        <ModalPaymentDebit />
      )}
    </Fragment>
  );
};

export default PaymentRequest;
