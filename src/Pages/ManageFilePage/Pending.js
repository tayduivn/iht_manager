import React, { Fragment, useEffect, useState } from "react";
import Search from "../../components/Search";
import TableCustom from "../../components/Table";
import { Tabs, Space, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  actListApprovedRequest,
  actApprovedRequest,
  actListPending,
} from "../../actions";
import { convertDateTime } from "../../utils/help";
import api from "../../utils/api";
import { actShowLoading, actHideLoading } from "../../actions/actionLoading";

const Approved = () => {
  const [total, setTotal] = useState(0);
  const [totalApprove, setTotalApprove] = useState(0);
  const listPending = useSelector((state) => state.listPending);
  const listApproved = useSelector((state) => state.listApproved);
  const dispatch = useDispatch();
  const pending = (data) => dispatch(actListPending(data));
  const lapproved = () => dispatch(actListApprovedRequest());
  const approved = (JOB_NO) => dispatch(actApprovedRequest(JOB_NO));

  const showLoading = () => dispatch(actShowLoading());
  const hideLoading = () => dispatch(actHideLoading());

  const fetchListPending = () => {
    showLoading();
    api("file/approved/list-pending/page=1", "GET", null).then((res) => {
      if (res.status === 200) {
        pending(res.data.data);
        setTotal(res.data.total_page);
        hideLoading();
      }
    });
  };

  const fetchListApproved = () => {
    showLoading();
    api("file/approved/list-approved/page=1", "GET", null).then((res) => {
      if (res.status === 200) {
        lapproved(res.data.data);
        setTotalApprove(res.data.total_page);
        hideLoading();
      }
    });
  };

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
      render: (text) => convertDateTime(text),
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
          {record.CHK_MK === "Y" ? null : (
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
          )}
        </>
      ),
    },
  ];

  const changePagePeding = (page) => {
    showLoading();
    api(`file/approved/list-pending/page=${page}`, "GET", null).then((res) => {
      if (res.status === 200) {
        pending(res.data.data);
        setTotal(res.data.total_page);
        hideLoading();
      }
    });
  };

  const changePageApprove = (page) => {
    showLoading();
    api(`file/approved/list-approved/page=${page}`, "GET", null).then((res) => {
      if (res.status === 200) {
        lapproved(res.data.data);
        setTotal(res.data.total_page);
        hideLoading();
      }
    });
  };

  return (
    <Fragment>
      {Search(searchs)}
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Chưa Duyệt" key="1">
          {TableCustom(listPending, columns, total, changePagePeding)}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đã Duyệt" key="2">
          {TableCustom(listApproved, columns, totalApprove, changePageApprove)}
        </Tabs.TabPane>
      </Tabs>
    </Fragment>
  );
};

export default Approved;
