import React, { Fragment, useEffect, useState } from "react";
import TableCustom from "../../components/Table";
import { useSelector, useDispatch } from "react-redux";
import { actFetchAgents } from "../../actions";
import Search from "../../components/Search";
import { actShowLoading, actHideLoading } from "../../actions/actionLoading";
import api from "../../utils/api";

const ListAgents = () => {
  const [total, setTotal] = useState(1);
  const agents = useSelector((state) => state.agents);
  const dispatch = useDispatch();
  const listAgents = (data) => dispatch(actFetchAgents(data));

  const showLoading = () => dispatch(actShowLoading());
  const hideLoading = () => dispatch(actHideLoading());

  const fetchAgents = () => {
    showLoading();
    api("data-basic/customer/type=3/page=1", "GET", null).then((res) => {
      if (res.status === 200) {
        listAgents(res.data.data);
        setTotal(res.data.total_page);
        hideLoading();
      }
    });
  };

  useEffect(() => {
    fetchAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Mã Đại Lý",
      dataIndex: "CUST_NO",
      key: "CUST_NO",
    },
    {
      title: "Tên Đại Lý",
      dataIndex: "CUST_NAME",
      key: "CUST_NAME",
    },
    {
      title: "Địa Chỉ Đại Lý",
      dataIndex: "CUST_ADDRESS",
      key: "CUST_ADDRESS",
    },
  ];

  const searchs = [
    {
      label: "Loại (Kinds)",
      selects: [
        {
          text: "Mã Đại Lý",
          value: "CUST_NO",
        },
        {
          text: "Tên Đại Lý",
          value: "CUST_NAME",
        },
      ],
    },
    {
      label: "Nội Dung (Contents)",
    },
  ];

  const changePage = (page) => {
    showLoading();
    api(`data-basic/customer/type=3/page=${page}`, "GET", null).then((res) => {
      if (res.status === 200) {
        listAgents(res.data.data);
        hideLoading();
      }
    });
  };

  return (
    <Fragment>
      {Search(searchs)}
      {TableCustom(agents, columns, total, changePage)}
    </Fragment>
  );
};

export default ListAgents;
