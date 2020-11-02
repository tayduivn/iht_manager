import React, { Fragment, useEffect, useState } from "react";
import TableCustom from "../../components/Table";
import { Space, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  actOpenDrawer,
  actAddJobRequest,
  actCloseDrawer,
  actSearchAllRequest,
  actEditJobRequest,
  actFetchJobs,
  actGetJob,
  actDeleteJobFollow,
} from "../../actions";
import DrawerCustom from "../../components/Drawer";
import { convertDateTime } from "../../utils/help";
import SearchApi from "../../components/Search/SearchApi";
import api from "../../utils/api";
import { actHideLoading, actShowLoading } from "../../actions/actionLoading";

const CreateFollow = () => {
  const [state, setstate] = useState(0);

  const jobs = useSelector((state) => state.jobs);
  const itemJob = useSelector((state) => state.itemCustomer);
  const dropdown = useSelector((state) => state.dropdown);
  const dispatch = useDispatch();
  const listJobs = (data) => dispatch(actFetchJobs(data));
  const openDrawer = () => dispatch(actOpenDrawer());
  const getJobReDux = (itemJob) => dispatch(actGetJob(itemJob));
  const addFollow = (job) => dispatch(actAddJobRequest(job));
  const closeDrawer = () => dispatch(actCloseDrawer());
  const editJob = (job) => dispatch(actEditJobRequest(job));
  const deleteJob = (JOB_NO) => dispatch(actDeleteJobFollow(JOB_NO));

  const showLoading = () => dispatch(actShowLoading());
  const hideLoading = () => dispatch(actHideLoading());

  const fetchJobs = () => {
    showLoading();
    api("file/job-start/page=1", "GET", null).then((res) => {
      if (res.status === 200) {
        listJobs(res.data.data);
        setstate(res.data.total_page);
        hideLoading();
      }
    });
  };

  const getJob = (JOB_NO) => {
    showLoading();
    api(`file/job-start/des/${JOB_NO}`, "GET", null).then((res) => {
      if (res.status === 200) {
        getJobReDux(res.data.data);
        hideLoading();
      }
    });
  };

  const Delete = (JOB_NO) => {
    var form = new FormData();
    form.append("JOB_NO", JOB_NO);
    api("file/job-start/remove", "POST", form).then((res) => deleteJob(JOB_NO));
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Job No",
      dataIndex: "JOB_NO",
      key: "JOB_NO",
    },
    {
      title: "Customer Name",
      dataIndex: "CUST_NAME",
      key: "CUST_NAME",
    },
    {
      key: "JOB_NO",
      render: (text, record) => (
        <>
          <Space size="middle">
            <Button
              type="primary"
              onClick={(e) => {
                openDrawer();
                getJob(record.JOB_NO);
              }}
            >
              Xem
            </Button>
            <Button
              type="primary"
              danger
              onClick={(e) => {
                Delete(record.JOB_NO);
              }}
            >
              Xóa
            </Button>
          </Space>
        </>
      ),
    },
  ];

  const fields = [
    {
      name: "JOB_NO",
      value: itemJob.JOB_NO,
      label: "Job No",
      disabled: true,
    },
    {
      name: "CUST_NO",
      value: itemJob.CUST_NO,
      label: "Mã Khách Hàng",
      select: true,
      dataSelect: dropdown.customer,
    },
    {
      name: "PNL_NO",
      value: itemJob.NV_CHUNGTU,
      label: "Nhân Viên Chứng Từ",
      select: true,
      dataSelect: dropdown.staff,
    },
    {
      name: "PNL_NO1",
      value: itemJob.NV_GIAONHAN,
      label: "Nhân Viên Giao Nhận",
      select: true,
      dataSelect: dropdown.staff,
    },
    {
      name: "ORDER_FROM",
      value: itemJob.ORDER_FROM,
      label: "Order From",
    },
    {
      name: "ORDER_TO",
      value: itemJob.ORDER_TO,
      label: "Order To",
    },
    {
      name: "CONTAINER_QTY",
      value: itemJob.CONTAINER_QTY,
      label: "Container Qty",
    },
    {
      name: "ETA_ETD",
      value: convertDateTime(itemJob.ETA_ETD),
      label: "ETA/ETD",
      date: true,
    },
    {
      name: "GW",
      value: itemJob.GW,
      label: "GW",
    },
    {
      name: "NW",
      value: itemJob.NW,
      label: "NW",
    },
    {
      name: "CONTAINER_NO",
      value: itemJob.CONTAINER_NO,
      label: "Container No",
      area: true,
    },
    {
      name: "CUSTOMS_NO",
      value: itemJob.CUSTOMS_NO,
      label: "Customs No",
    },
    {
      name: "CUSTOMS_DATE",
      value: convertDateTime(itemJob.CUSTOMS_DATE),
      label: "Ngày tờ khai",
      date: true,
    },
    {
      name: "BILL_NO",
      value: itemJob.BILL_NO,
      label: "Bill No",
    },
    {
      name: "INVOICE_NO",
      value: itemJob.INVOICE_NO,
      label: "Invoice No",
    },
    {
      name: "NOTE",
      value: itemJob.NOTE,
      label: "Note",
    },
    {
      name: "POL",
      value: itemJob.POL,
      label: "POL",
    },
    {
      name: "POD",
      value: itemJob.POD,
      label: "POD",
    },
  ];

  const onFinish = (values) => {
    const form = new FormData();
    form.append("CUST_NO", values.CUST_NO);
    form.append("NV_CHUNGTU", values.PNL_NO);
    form.append("NV_GIAONHAN", values.PNL_NO1);
    form.append("NOTE", values.NOTE);
    form.append("ORDER_FROM", values.ORDER_FROM);
    form.append("ORDER_TO", values.ORDER_TO);
    form.append("CONTAINER_QTY", values.CONTAINER_QTY);
    form.append("POL", values.POL);
    form.append("POD", values.POD);
    form.append("CONTAINER_NO", values.CONTAINER_NO);
    form.append("CUSTOMS_NO", values.CUSTOMS_NO);
    form.append("CUSTOMS_DATE", values.CUSTOMS_DATE);
    form.append("BILL_NO", values.BILL_NO);
    form.append("NW", values.NW);
    form.append("GW", values.GW);
    form.append("INVOICE_NO", values.INVOICE_NO);
    form.append("JOB_CAM_NO", "");
    form.append("BRANCH_ID", localStorage.getItem("BRANCH_ID"));
    if (itemJob.INPUT_USER) {
      form.append("MODIFY_USER", localStorage.getItem("USER_NO"));
      form.append("JOB_NO", values.JOB_NO);
      editJob(form);
      form.append("ETA_ETD", values.ETA_ETD);
      closeDrawer();
    } else {
      form.append("INPUT_USER", localStorage.getItem("USER_NO"));
      addFollow(form);
      closeDrawer();
    }
  };

  const onSearch = (values) => {
    if (values.keyword) {
      dispatch(actSearchAllRequest(values.type, values.keyword));
    } else {
      fetchJobs();
    }
  };

  const changePage = (page) => {
    showLoading();
    api(`file/job-start/page=${page}`, "GET", null).then((res) => {
      if (res.status === 200) {
        listJobs(res.data.data);
        setstate(res.data.total_page);
        hideLoading();
      }
    });
  };

  return (
    <Fragment>
      {SearchApi(onSearch)}
      {TableCustom(jobs, columns, state, changePage)}
      {DrawerCustom(fields, itemJob, onFinish)}
    </Fragment>
  );
};

export default CreateFollow;
