import React, { Fragment, useEffect } from "react";
import TableCustom from "../../components/Table";
import { useSelector, useDispatch } from "react-redux";
import { actFetchStaffsRequest } from "../../actions";
import Search from "../../components/Search";

const InformationStaff = () => {
  const staffs = useSelector((state) => state.staffs);
  const dispatch = useDispatch();
  const fetchStaff = () => dispatch(actFetchStaffsRequest());

  useEffect(() => {
    fetchStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const columns = [
    {
      title: "Mã Nhân Viên",
      dataIndex: "PNL_NO",
      key: 'PNL_NO',
    },
    {
      title: "Tên Nhân Viên",
      dataIndex: "PNL_NAME",
      key: "PNL_NAME",
    },
    {
      title: "Tên Nhân Viên (Chinese Name)",
      dataIndex: "PNL_NAME_C",
      key: "PNL_NAME_C",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "PNL_TEL",
      key: "PNL_TEL",
    },
    {
      title: "Chi Nhánh",
      dataIndex: "BRANCH_ID",
      key: "BRANCH_ID",
    },
  ];

  const searchs = [
    {
      label: "Loại (Kinds)",
      selects: [
        {
          text: "Mã Nhân Viên",
          value: "PNL_NO",
        },
        {
          text: "Tên Nhân Viên",
          value: "PNL_NAME",
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
      {TableCustom(staffs, columns)}
    </Fragment>
  );
};

export default InformationStaff;
