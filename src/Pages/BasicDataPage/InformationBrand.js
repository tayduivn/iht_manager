import React, { Fragment, useEffect } from "react";
import TableCustom from "../../components/Table";
import { useSelector, useDispatch } from "react-redux";
import { actFetchBrandsRequest } from "../../actions";

const InformationBrand = () => {
  const brands = useSelector((state) => state.brands);
  const dispatch = useDispatch();
  const fetchBrands = () => dispatch(actFetchBrandsRequest());

  useEffect(() => {
    fetchBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(brands)

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
  ];

  return (
    <Fragment>
      {TableCustom(brands, columns)}
    </Fragment>
  );
};

export default InformationBrand;
