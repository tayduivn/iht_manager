import React, { Fragment, useEffect } from "react";
import TableCustom from "../../components/Table";
import { useSelector, useDispatch } from "react-redux";
import { actFetchStaffsRequest, actOpenDrawer, actGetStaffRequeset } from "../../actions";
import Search from "../../components/Search";
import { Space, Button } from "antd";
import DrawerCustom from "../../components/Drawer";


const InformationStaff = () => {
  const staffs = useSelector((state) => state.staffs);
  const itemCustomer = useSelector((state) => state.itemCustomer);
  const dispatch = useDispatch();
  const fetchStaff = () => dispatch(actFetchStaffsRequest());
  const openDrawer = () => dispatch(actOpenDrawer());
  const getStaff = (PNL_NO) => dispatch(actGetStaffRequeset(PNL_NO));

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
      dataIndex: "BRANCH_NAME",
      key: "BRANCH_NAME",
    },
    {
      title: "",
      key: "CUST_NO",
      render: (text, record) => (
        <>
          <Space size="middle">
            <Button
              type="primary"
              onClick={(e) => {
                openDrawer();
                 getStaff(record.PNL_NO);
              }}
            >
              Xem
            </Button>
          </Space>
        </>
      ),
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

  const fields = [
    {
      name: "BRANCH_NAME",
      value: itemCustomer.BRANCH_NAME,
      label: "Chi Nhánh",
    },
    { name: "PNL_NAME", value: itemCustomer.PNL_NAME, label: "Tên Nhân Viên" },
    {
      name: "PNL_NAME_C",
      value: itemCustomer.PNL_NAME_C,
      label: "Tên Tiếng Hoa",
    },
    {
      name: "PNL_ADDRESS",
      value: itemCustomer.PNL_ADDRESS,
      label: "Địa Chỉ",
    },
    {
      name: "PNL_ID",
      value: itemCustomer.PNL_ID,
      label: "Số CMND",
    },
    {
      name: "PNL_TEL",
      value: itemCustomer.PNL_TEL,
      label: "Điện Thoại",
    },
  ];


  return (
    <Fragment>
      {Search(searchs)}
      {TableCustom(staffs, columns)}
      {DrawerCustom(fields, itemCustomer)}
    </Fragment>
  );
};

export default InformationStaff;
