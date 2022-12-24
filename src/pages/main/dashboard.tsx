import React, { useEffect } from "react";
import { useDispatch } from "@/store";
import { setTitle } from "@/store/reducers/view";

const Dashboard: React.FC = () => {
  // set title
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle("dashboard"));
  }, [dispatch]);

  return <div></div>;
};

export default Dashboard;
