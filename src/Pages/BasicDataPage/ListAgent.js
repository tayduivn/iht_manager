import React, { Fragment, useEffect } from "react";
import TableCustom from "../../components/Table";
import { useSelector, useDispatch } from "react-redux";
import { actFetchAgentsRequest } from "../../actions";
import Search from "../../components/Search";

const ListAgents = () => {
  const agents = useSelector((state) => state.agents);
  const dispatch = useDispatch();
  const fetchAgents = () => dispatch(actFetchAgentsRequest());

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

  return (
    <Fragment>
      {Search(searchs)}
      {TableCustom(agents, columns)}
    </Fragment>
  );
};

export default ListAgents;
