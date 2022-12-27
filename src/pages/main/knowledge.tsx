import React, { useEffect } from "react";
import { useDispatch } from "@/store";
import { setTitle } from "@/store/reducers/view";

const Knowledge: React.FC = () => {
  // set title
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle("knowledge"));
  }, [dispatch]);

  return (
    <div>
      <h1>Knowledge</h1>
    </div>
  );
};

export default Knowledge;
