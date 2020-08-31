import React from "react";
import { Table } from "antd";
import _ from "lodash";
import { useSelector } from "react-redux";

const TableCustom = (data, columns) => {
  const searchs = useSelector((state) => state.searchReducer);

  if (searchs.kinds === "CUST_NAME") {
    data = _.filter(data, function (o) {
      return _.toLower(o.CUST_NAME).indexOf(_.toLower(searchs.keyword)) !== -1;
    });
  } else if (searchs.kinds === "CUST_NO") {
    data = _.filter(data, function (o) {
      return _.toLower(o.CUST_NO).indexOf(_.toLower(searchs.keyword)) !== -1;
    });
  } else if (searchs.kinds === "PNL_NO") {
    data = _.filter(data, function (o) {
      return _.toLower(o.PNL_NO).indexOf(_.toLower(searchs.keyword)) !== -1;
    });
  } else if (searchs.kinds === "PNL_NAME") {
    data = _.filter(data, function (o) {
      return _.toLower(o.PNL_NAME).indexOf(_.toLower(searchs.keyword)) !== -1;
    });
  } else if (searchs.kinds === "JOB_NO") {
    data = _.filter(data, function (o) {
      return _.toLower(o.JOB_NO).indexOf(_.toLower(searchs.keyword)) !== -1;
    });
  } else if (searchs.kinds === "ORDER_DATE") {
    data = _.filter(data, function (o) {
      return _.toLower(o.ORDER_DATE).indexOf(_.toLower(searchs.keyword)) !== -1;
    });
  } else if (searchs.kinds === "Chi_Tam_Ung") {
    data = _.filter(data, function (o) {
      return _.toLower(o.LENDER_NAME).indexOf(_.toLower("Chi Tam Ung")) !== -1;
    });
  } else if (searchs.kinds === "Phieu_Tam_Ung") {
    data = _.filter(data, function (o) {
      return (
        _.toLower(o.LENDER_NAME).indexOf(_.toLower("Phieu Tam Ung")) !== -1
      );
    });
  } else if (searchs.kinds === "Chi_Truc_Tiep") {
    data = _.filter(data, function (o) {
      return (
        _.toLower(o.LENDER_NAME).indexOf(_.toLower("Chi Truc Tiep")) !== -1
      );
    });
  }else if (searchs.kinds === "LENDER_NO") {
    data = _.filter(data, function (o) {
      return _.toLower(o.LENDER_NO).indexOf(_.toLower(searchs.keyword)) !== -1;
    });
  }

  return (
    <Table
      rowKey={columns[0].key.toString()}
      dataSource={data}
      columns={columns}
      pagination
    />
  );
};

export default TableCustom;
