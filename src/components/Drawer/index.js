import React from "react";
import { Drawer } from "antd";
import "./drawer.css";
import { useDispatch, useSelector } from "react-redux";
import { actCloseDrawer, actEmptyDetail } from "../../actions";
import CustomizedForm from "./CustomizedForm";

const DrawerCustom = (fields, item, onFinish) => {
  const visible = useSelector((state) => state.isDrawer);
  const distpatch = useDispatch();
  const closeDrawer = () => distpatch(actCloseDrawer());
  const emptyDetail = () => distpatch(actEmptyDetail());

  function onClose() {
    emptyDetail();
    closeDrawer();
  }

  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <div>
        <CustomizedForm fields={fields} item={item} onFinish={onFinish} />
      </div>
    </Drawer>
  );
};

export default DrawerCustom;
