import React, { Fragment, useEffect } from "react";
import TableCustom from "../../components/Table";
import { useSelector, useDispatch } from "react-redux";
import {
  actFetchStaffsRequest,
  actOpenDrawer,
  actGetStaffRequeset,
  actCloseDrawer,
  actAddStaffRequest,
  actEditStafffRequest,
} from "../../actions";
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
  const closeDrawer = () => dispatch(actCloseDrawer());
  const addStaff = (staff) => dispatch(actAddStaffRequest(staff));
  const editStaff = (staff) => dispatch(actEditStafffRequest(staff));

  useEffect(() => {
    fetchStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Mã Nhân Viên",
      dataIndex: "PNL_NO",
      key: "PNL_NO",
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
      key: "PNL_NO",
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
      name: "PNL_NO",
      value: itemCustomer.PNL_NO,
      label: "Mã Nhân Viên",
      disabled: true,
    },
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

  const onFinish = (values) => {
    console.log(values);
    const form = new FormData();
    form.append("PNL_NAME", values.PNL_NAME);
    form.append("PNL_NAME_C", values.PNL_NAME_C);
    form.append("PNL_ADDRESS", values.PNL_ADDRESS);
    form.append("PNL_ID", values.PNL_ID);
    form.append("PNL_TEL", values.PNL_TEL);
    form.append("BRANCH_ID", localStorage.getItem("BRANCH_ID"));
    if (itemCustomer.INPUT_USER) {
      form.append("MODIFY_USER", localStorage.getItem("USER_NO"));
      form.append("PNL_NO", values.PNL_NO);
      editStaff(form);
      closeDrawer();
    } else {
      form.append("INPUT_USER", localStorage.getItem("USER_NO"));
      addStaff(form);
      closeDrawer();
    }
  };

  return (
    <Fragment>
      {Search(searchs)}
      {TableCustom(staffs, columns)}
      {DrawerCustom(fields, itemCustomer, onFinish)}
    </Fragment>
  );
};

export default InformationStaff;
