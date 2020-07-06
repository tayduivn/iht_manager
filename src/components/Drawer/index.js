import React from "react";
import { Drawer } from "antd";
import "./drawer.css";
import { useDispatch, useSelector } from "react-redux";
import { actCloseDrawer } from "../../actions";
import CustomizedForm from "./CustomizedForm";

const DrawerCustom = (fields, item) => {
  const visible = useSelector((state) => state.isDrawer);
  const distpatch = useDispatch();
  const closeDrawer = () => distpatch(actCloseDrawer());

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      onClose={closeDrawer}
      visible={visible}
    >
      <div>
        <CustomizedForm fields={fields} item={item} onFinish={onFinish} />
      </div>
    </Drawer>
  );
};

export default DrawerCustom;
