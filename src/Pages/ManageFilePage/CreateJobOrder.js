import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actSearchAllRequest,
  actGetJobNotCreateOrdeRequest,
  actOpenModalEdit,
  actGetJobOrder,
  actDeleteJobOrder,
} from "../../actions";
import { Space, Button } from "antd";
import TableCustom from "../../components/Table";
import SearchApi from "../../components/Search/SearchApi";
import ModalCustom from "../../components/Modal";
import ModalEdit from "../../components/Modal/ModalEdit";
import api from "../../utils/api";
import { actShowLoading, actHideLoading } from "../../actions/actionLoading";

const CreateJobOrder = () => {
  const [total, setTotal] = useState(1);
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.joborder);
  const listJobs = (data) => dispatch(actGetJobOrder(data));
  const getJobOrder = (JOB_NO) =>
    dispatch(actGetJobNotCreateOrdeRequest(JOB_NO, "JOB_ORDER"));

  const itemJob = useSelector((state) => state.itemCustomer);

  const openModalEdit = () => dispatch(actOpenModalEdit());

  const showLoading = () => dispatch(actShowLoading());
  const hideLoading = () => dispatch(actHideLoading());

  const deleteJob = (JOB_NO) => dispatch(actDeleteJobOrder(JOB_NO))

  const fetchJobs = () => {
    showLoading();
    api("file/job-order/page=1", "GET", null).then((res) => {
      if (res.status === 200) {
        listJobs(res.data.data);
        setTotal(res.data.total_page);
        hideLoading();
      }
    });
  };

  const Delete = (JOB_NO) => {
    var form = new FormData();
    form.append("JOB_NO", JOB_NO);
    api("file/job-order/remove", "POST", form).then((res) =>
    deleteJob(JOB_NO)
    );
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState(true);

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
            <Button
              type="primary"
              danger
              onClick={(e) => {
                // Delete(record.JOB_NO);
              }}
            >
              Xóa
            </Button>
          </Space>
        </>
      ),
    },
  ];

  const onSearch = (values) => {
    if (values.keyword) {
      dispatch(actSearchAllRequest(values.type, values.keyword));
    } else {
      fetchJobs();
    }
  };

  const changeEdit = () => {
    setState(true);
  };

  const changePage = (page) => {
    showLoading();
    api(`file/job-order/page=${page}`, "GET", null).then((res) => {
      if (res.status === 200) {
        listJobs(res.data.data);
        setTotal(res.data.total_page);
        hideLoading();
      }
    });
  };

  return (
    <Fragment>
      {SearchApi(onSearch, state)}
      {TableCustom(jobs, columns, total, changePage)}
      {state === false ? (
        <ModalEdit changeEdit={changeEdit} itemJob={itemJob} />
      ) : (
        <ModalCustom />
      )}
    </Fragment>
  );
};

export default CreateJobOrder;
