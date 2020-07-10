import React, { Fragment, useEffect } from "react";
import TableCustom from "../../components/Table";
import { useSelector, useDispatch } from "react-redux";
import {
  actFetchCarriersRequest,
  actOpenDrawer,
  actGetCarrierRequeset,
  actAddCarrierRequest,
  actEditCarrierRequest,
  actCloseDrawer,
} from "../../actions";
import Search from "../../components/Search";
import DrawerCustom from "../../components/Drawer";
import { Space, Button } from "antd";

const ListCarriers = () => {
  const carriers = useSelector((state) => state.carriers);
  const dispatch = useDispatch();
  const fetchCarriers = () => dispatch(actFetchCarriersRequest());
  const openDrawer = () => dispatch(actOpenDrawer());
  const itemCustomer = useSelector((state) => state.itemCustomer);
  const getCarrie = (CUST_NO) => dispatch(actGetCarrierRequeset(CUST_NO));
  const addCarier = (carier) => dispatch(actAddCarrierRequest(carier));
  const editCarier = (carier) => dispatch(actEditCarrierRequest(carier));
  const closeDrawer = () => dispatch(actCloseDrawer());

  useEffect(() => {
    fetchCarriers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Mã Hãng Tàu",
      dataIndex: "CUST_NO",
      key: "CUST_NO",
    },
    {
      title: "Tên Hãng Tàu",
      dataIndex: "CUST_NAME",
      key: "CUST_NAME",
    },
    {
      title: "Địa Chỉ Hãng Tàu",
      dataIndex: "CUST_ADDRESS",
      key: "CUST_ADDRESS",
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
                getCarrie(record.CUST_NO);
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
          text: "Mã Hãng Tàu",
          value: "CUST_NO",
        },
        {
          text: "Tên Hãng Tàu",
          value: "CUST_NAME",
        },
      ],
    },
    {
      label: "Nội Dung (Contents)",
    },
  ];

  const fields = [
    {
      name: "CUST_NO",
      value: itemCustomer.CUST_NO,
      label: "Mã Hãng Tàu",
    },
    {
      name: "CUST_NAME",
      value: itemCustomer.CUST_NAME,
      label: "Tên Hãng Tàu",
    },
    {
      name: "CUST_ADDRESS",
      value: itemCustomer.CUST_ADDRESS,
      label: "Địa Chỉ Hãng Tàu",
      area: true,
    },
    {
      name: "CUST_TEL1",
      value: itemCustomer.CUST_TEL1,
      label: "Điện Thoại 1",
    },
    { name: "CUST_TEL2", value: itemCustomer.CUST_TEL2, label: "Điện Thoại 2" },
    { name: "CUST_FAX", value: itemCustomer.CUST_FAX, label: "Số Fax" },
    { name: "CUST_TAX", value: itemCustomer.CUST_TAX, label: "Mã Số Thuế" },
    { name: "CUST_BOSS", value: itemCustomer.CUST_TAX, label: "Người Liên Hệ" },
  ];
  const onFinish = (values) => {
    const form = new FormData();
    form.append("CUST_TYPE", 2);
    form.append("CUST_NO", values.CUST_NO);
    form.append("CUST_NAME", values.CUST_NAME);
    form.append("CUST_ADDRESS", values.CUST_ADDRESS);
    form.append("CUST_TEL1", values.CUST_TEL1);
    form.append("CUST_TEL2", values.CUST_TEL2);
    form.append("CUST_FAX", values.CUST_FAX);
    form.append("CUST_TAX", values.CUST_TAX);
    form.append("CUST_BOSS", values.CUST_BOSS);
    form.append("BRANCH_ID", localStorage.getItem("BRANCH_ID"));
    console.log(values)
    if (itemCustomer.INPUT_USER) {
      form.append("MODIFY_USER", localStorage.getItem("USER_NO"));
      editCarier(form);
      console.log('dddd')
      closeDrawer();
    } else {
      form.append("INPUT_USER", localStorage.getItem("USER_NO"));
      addCarier(form);
      console.log('aaaa')
      closeDrawer();
    }
  };

  return (
    <Fragment>
      {Search(searchs)}
      {TableCustom(carriers, columns)}
      {DrawerCustom(fields, itemCustomer, onFinish)}
    </Fragment>
  );
};

export default ListCarriers;
