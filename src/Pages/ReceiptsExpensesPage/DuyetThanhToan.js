import React, { useEffect, useState } from "react";
import { Tabs, Space, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  actListApprovedKHRequest,
  actListPaidKH,
  actListPendingKH,
} from "../../actions";
import { convertDateTime } from "../../utils/help";
import TableCustom from "../../components/Table";
import api from "../../utils/api";
import { actHideLoading, actShowLoading } from "../../actions/actionLoading";

const DuyetThanhToan = () => {
  const [total, setTotal] = useState(0);
  const listPendingKH = useSelector((state) => state.listPendingKH);
  const listApprove = useSelector((state) => state.listPending);
  const dispatch = useDispatch();
  const listPending = (data) => dispatch(actListPendingKH(data));
  const listPaid = (data) => dispatch(actListPaidKH(data));
  const approve = (values) => dispatch(actListApprovedKHRequest(values));

  const showLoading = () => dispatch(actShowLoading());
  const hideLoading = () => dispatch(actHideLoading());

  const fetchListPending = () => {
    showLoading();
    api("payment/paid-debit/list-pending/page=1", "GET", null).then((res) => {
      if (res.status === 200) {
        setTotal(res.data.total_page)
        listPending(res.data.data);
        hideLoading();
      }
    });
  };

  const fetchListPaid = () => {
    showLoading();
    api("payment/paid-debit/list-paid/page=1", "GET", null).then((res) => {
      if (res.status === 200) {
        setTotal(res.data.total_page)
        listPaid(res.data.data);
        hideLoading();
      }
    });
  };

  useEffect(() => {
    fetchListPending();
    fetchListPaid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState(1);

  const columns = [
    {
      title: "Job No",
      dataIndex: "JOB_NO",
      key: "JOB_NO",
    },
    {
      title: "Customer Name",
      dataIndex: "CUST_NAME",
    },
    {
      title: "Debit Date",
      dataIndex: "DEBIT_DATE",
      render: (text) => convertDateTime(text),
    },
    {
      title: "From",
      dataIndex: "TRANS_FROM",
    },
    {
      title: "To",
      dataIndex: "TRANS_TO",
    },
    {
      title: "Payment Date",
      dataIndex: "PAYMENT_DATE",
      render: (text) => convertDateTime(text),
    },
    {
      title: "Payment Amount",
      dataIndex: "sum_AMT",
      render: (value) => {
        var number = new Intl.NumberFormat().format(
          parseInt(value.replace(/\$\s?|(,*)/g, ""))
        );
        return <p style={{ color: "red", fontWeight: "bold" }}>{number}</p>;
      },
    },
    {
      title: "",
      key: "JOB_NO",
      render: (text, record) => (
        <>
          {state === 1 ? (
            <Space size="middle">
              <Button
                type="primary"
                onClick={() => {
                  approve(record.JOB_NO);
                }}
              >
                Duyệt
              </Button>
            </Space>
          ) : (
            <Space size="middle">
              <Button
                type="primary"
                onClick={() => {
                  // approve(record.JOB_NO);
                }}
              >
                Bỏ Duyệt
              </Button>
            </Space>
          )}
        </>
      ),
    },
  ];

  const changePagePeding = (page) => {
    showLoading();
    api(`payment/paid-debit/list-pending/page=${page}`, "GET", null).then((res) => {
      if (res.status === 200) {
        listPending(res.data.data);
        hideLoading();
      }
    });
  };

  const changePageApprove= (page) => {
    showLoading();
    api(`payment/paid-debit/list-paid/page=${page}`, "GET", null).then((res) => {
      if (res.status === 200) {
        listPaid(res.data.data);
        hideLoading();
      }
    });
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" onTabClick={(e) => setState(e)}>
        <Tabs.TabPane tab="Chưa Duyệt" key="1">
          {TableCustom(listPendingKH, columns,total, changePagePeding)}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đã Duyệt" key="2">
          {TableCustom(listApprove, columns,total,changePageApprove)}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default DuyetThanhToan;
