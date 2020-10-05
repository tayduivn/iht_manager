import { Tabs, Space, Button } from "antd";
import React, { useEffect } from "react";
import TableCustom from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { actDesBoatContRequest, actListBoatRequest, actListContRequest,actOpenModalEdit } from "../../actions";
import { convertDateTime } from "../../utils/help";
import ModalBoat from "../../components/Modal/ModalBoat";

export default function BoatCont() {
  const dispatch = useDispatch();
  const fetchBoat = () => dispatch(actListBoatRequest());
  const fetchCont = () => dispatch(actListContRequest());
  const boat = useSelector((state) => state.boat);
  const openModalEdit = () => dispatch(actOpenModalEdit());
  const destBoatCont = (type, value) => dispatch(actDesBoatContRequest(type, value))

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
              destBoatCont(record.FEE_TYPE, record.BOAT_FEE_MONTH)
              openModalEdit()
            }}
          >
            Xem
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        onTabClick={(e) => (e === "2" ? fetchCont() : fetchBoat())}
      >
        <Tabs.TabPane tab="Book Tàu" key="1">
          {TableCustom(boat, columns)}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Cược Cont" key="2">
          {TableCustom(boat, columns)}
        </Tabs.TabPane>
      </Tabs>
      <ModalBoat />
    </div>
  );
}
