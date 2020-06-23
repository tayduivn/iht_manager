import React from "react";
import { Table } from "antd";
import _ from "lodash";
import { useSelector } from "react-redux";

const TableCustom = (data, columns) => {
  const searchs = useSelector((state) => state.searchReducer);

  // if (keyword) {
  //   data = _.filter(data, function (o) {
  //     return _.toLower(o.CUST_NAME).indexOf(_.toLower(keyword)) !== -1;
  //   });
  // }

  if (searchs.kinds === "CUST_NAME") {
    data = _.filter(data, function (o) {
      return _.toLower(o.CUST_NAME).indexOf(_.toLower(searchs.keyword)) !== -1;
    });
  } else {
    data = _.filter(data, function (o) {
      return _.toLower(o.CUST_NO).indexOf(_.toLower(searchs.keyword)) !== -1;
    });
  }
  return (
    <Table
      rowKey={columns[0].key}
      dataSource={data}
      columns={columns}
      pagination
    />
  );
};

export default TableCustom;
