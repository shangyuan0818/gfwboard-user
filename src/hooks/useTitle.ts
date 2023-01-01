import React, { useEffect } from "react";

// project imports
import { setTitle } from "@/store/reducers/view";
import { useDispatch } from "@/store";

const useTitle = (title: string, deps: React.DependencyList = []) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle(title));
  }, [title, ...deps]);
};

export default useTitle;
