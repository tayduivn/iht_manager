import React, { useEffect, useState } from "react";
import { Tabs, Space, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  actListApprovedKHRequest,
  actListPaidKHRequest,
  actListPendingKHRequest,
} from "../../actions";
import { convertDateTime } from "../../utils/help";
import TableCustom from "../../components/Table";

const DuyetThanhToan = () => {
  const listPendingKH = useSelector((state) => state.listPendingKH);
  const listApprove = useSelector((state) => state.listPending);
  const dispatch = useDispatch();
  const fetchListPending = () => dispatch(actListPendingKHRequest());
  const fetchListPaid = () => dispatch(actListPaidKHRequest());
  const approve = (values) => dispatch(actListApprovedKHRequest(values));

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

  return (
    <div>
      <Tabs defaultActiveKey="1" onTabClick={(e) => setState(e)}>
        <Tabs.TabPane tab="Chưa Duyệt" key="1">
          {TableCustom(listPendingKH, columns)}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đã Duyệt" key="2">
          {TableCustom(listApprove, columns)}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default DuyetThanhToan;
