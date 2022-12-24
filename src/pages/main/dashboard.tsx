import React, { useEffect } from "react";

// project import
import { useDispatch } from "@/store";
import { setTitle } from "@/store/reducers/view";
import DashboardSection from "@/sections/dashboard";

const Dashboard: React.FC = () => {
  // set title
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle("dashboard"));
  }, [dispatch]);

  return <DashboardSection />;
};

export default Dashboard;
