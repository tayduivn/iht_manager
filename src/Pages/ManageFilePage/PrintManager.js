import { Divider } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  actFetchJobsRequest,
  actGetJobOrderRequest,
  actFetchCustomersRequeset,
} from "../../actions";
import InJobOrder from "../../components/ItemPrint/InJobOrder";
import InPhieuTheoDoi from "../../components/ItemPrint/InPhieuTheoDoi";
import InRefund from "../../components/ItemPrint/InRefund";
import InThongKeJob from "../../components/ItemPrint/InThongKeJob";

export default function PrintManager() {
  const dispatch = useDispatch();
  const fetchJob = () => dispatch(actFetchJobsRequest());
  const fetchJobs = () => dispatch(actGetJobOrderRequest());
  const fetchCustomers = () => dispatch(actFetchCustomersRequeset());

  useEffect(() => {
    fetchJob();
    fetchJobs();
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  return (
    <div>
      <InPhieuTheoDoi />
      <Divider />
      <InJobOrder />
      <Divider />
      <InRefund/>
      <Divider />
      <InThongKeJob />
    </div>
  );
}
