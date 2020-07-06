import React, { Fragment, useEffect } from "react";
import TableCustom from "../../components/Table";
import { useSelector, useDispatch } from "react-redux";
import { actFetchBrandsRequest, actOpenDrawer } from "../../actions";
import { Space, Button } from "antd";
import DrawerCustom from "../../components/Drawer";

const InformationBrand = () => {
  const brands = useSelector((state) => state.brands);
  const dispatch = useDispatch();
  const fetchBrands = () => dispatch(actFetchBrandsRequest());
  const openDrawer = () => dispatch(actOpenDrawer());

  useEffect(() => {
    fetchBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Brand Id",
      dataIndex: "BRANCH_ID",
      key: "BRANCH_ID",
    },
    {
      title: "Brand Name",
      dataIndex: "BRANCH_NAME",
      key: "BRANCH_NAME",
    },
    {
      title: "BRANCH ADD",
      dataIndex: "BRANCH_ADD",
      key: "BRANCH_ADD",
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
                // getCustomer(record.CUST_NO);
              }}
            >
              Xem
            </Button>
          </Space>
        </>
      ),
    },
  ];

  return (
    <Fragment>
      {TableCustom(brands, columns)}
      {DrawerCustom()}
    </Fragment>
  );
};

export default InformationBrand;
