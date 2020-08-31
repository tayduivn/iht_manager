import React, { Fragment, useEffect } from "react";
import Search from "../../components/Search";
import TableCustom from "../../components/Table";
import { Tabs, Space, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  actListPendingRequest,
  actListApprovedRequest,
  actApprovedRequest,
} from "../../actions";

const Approved = () => {
  const listPending = useSelector((state) => state.listPending);
  const listApproved = useSelector((state) => state.listApproved);
  const dispatch = useDispatch();
  const fetchListPending = () => dispatch(actListPendingRequest());
  const fetchListApproved = () => dispatch(actListApprovedRequest());
  const approved = (JOB_NO) => dispatch(actApprovedRequest(JOB_NO));

  useEffect(() => {
    fetchListPending();
    fetchListApproved();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchs = [
    {
      label: "Loại (Kinds)",
      selects: [
        {
          text: "Job No",
          value: "JOB_NO",
        },
        {
          text: "Ngày",
          value: "ORDER_DATE",
        },
      ],
    },
    {
      label: "Nội Dung (Contents)",
    },
  ];

  const columns = [
    {
      title: "Job No",
      dataIndex: "JOB_NO",
      key: "JOB_NO",
    },
    {
      title: "Order Date",
      dataIndex: "ORDER_DATE",
      key: "ORDER_DATE",
    },
    {
      title: "Customer No",
      dataIndex: "CUSTOMS_NO",
      key: "CUSTOMS_NO",
    },
    {
      title: "Customer Name",
      dataIndex: "CUST_NAME",
      key: "CUST_NAME",
    },
    {
      title: "Consignee",
      dataIndex: "CONSIGNEE",
      key: "CONSIGNEE",
    },
    {
      title: "Shipper",
      dataIndex: "SHIPPER",
      key: "SHIPPER",
    },
    {
      title: "Order From",
      dataIndex: "ORDER_FROM",
      key: "ORDER_FROM",
    },
    {
      title: "Order To",
      dataIndex: "ORDER_TO",
      key: "ORDER_TO",
    },
    {
      title: "",
      key: "JOB_NO",
      render: (text, record) => (
        <>
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                var form = new FormData();
                form.append("JOB_NO", record.JOB_NO);
                approved(form);
              }}
            >
              Duyệt
            </Button>
          </Space>
        </>
      ),
    },
  ];

  return (
    <Fragment>
      {Search(searchs)}
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Chưa Duyệt" key="1">
          {TableCustom(listPending, columns)}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đã Duyệt" key="2">
          {TableCustom(listApproved, columns)}
        </Tabs.TabPane>
      </Tabs>
    </Fragment>
  );
};

export default Approved;
