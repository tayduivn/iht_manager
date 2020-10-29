import { Tabs, Space, Button } from "antd";
import React, { useEffect, useState } from "react";
import TableCustom from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  actDesBoatContRequest,
  actListBoat,
  actListCont,
  actOpenModalEdit,
} from "../../actions";
import { convertDateTime } from "../../utils/help";
import ModalBoat from "../../components/Modal/ModalBoat";
import { actShowLoading, actHideLoading } from "../../actions/actionLoading";
import api from "../../utils/api";

export default function BoatCont() {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(1);

  const listBoat = (data) => dispatch(actListBoat(data));
  const listCont = (data) => dispatch(actListCont(data));
  const boat = useSelector((state) => state.boat);
  const openModalEdit = () => dispatch(actOpenModalEdit());
  const destBoatCont = (type, value) =>
    dispatch(actDesBoatContRequest(type, value));

  const showLoading = () => dispatch(actShowLoading());
  const hideLoading = () => dispatch(actHideLoading());

  const fetchBoat = () => {
    showLoading();
    api("payment/boat-fee/list-boat-month-m/page=1", "GET", null).then(
      (res) => {
        if (res.status === 200) {
          listCont(res.data.data);
          setTotal(res.data.total_page);
          hideLoading();
        }
      }
    );
  };

  const fetchCont = () => {
    showLoading();
    api("payment/boat-fee/list-fee-month-m/page=1", "GET", null).then((res) => {
      if (res.status === 200) {
        listBoat(res.data.data);
        setTotal(res.data.total_page);
        hideLoading();
      }
    });
  };

  useEffect(() => {
    fetchBoat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Month",
      dataIndex: "BOAT_FEE_MONTH",
      key: "BOAT_FEE_MONTH",
      render: (text) => convertDateTime(text),
    },
    {
      title: "",
      key: "BOAT_FEE_MONTH",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              destBoatCont(record.FEE_TYPE, record.BOAT_FEE_MONTH);
              openModalEdit();
            }}
          >
            Xem
          </Button>
        </Space>
      ),
    },
  ];

  const changePageBoat = (page) => {
    showLoading();
    api(`payment/boat-fee/list-boat-month-m/page=${page}`, "GET", null).then(
      (res) => {
        if (res.status === 200) {
          listBoat(res.data.data);
          hideLoading();
        }
      }
    );
  };

  const changePageCont = (page) => {
    showLoading();
    api(`payment/boat-fee/list-fee-month-m/page=${page}`, "GET", null).then(
      (res) => {
        if (res.status === 200) {
          listCont(res.data.data);
          hideLoading();
        }
      }
    );
  };

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        onTabClick={(e) => (e === "2" ? fetchCont() : fetchBoat())}
      >
        <Tabs.TabPane tab="Book Tàu" key="1">
          {TableCustom(boat, columns, total, changePageBoat)}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Cược Cont" key="2">
          {TableCustom(boat, columns, total, changePageCont)}
        </Tabs.TabPane>
      </Tabs>
      <ModalBoat />
    </div>
  );
}
