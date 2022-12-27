import React, { ReactNode, useEffect } from "react";
import lo from "lodash-es";
import { useDispatch, useSelector } from "@/store";
import { useGetUserInfoQuery } from "@/store/services/api";
import { logout } from "@/store/reducers/auth";

const AccountStateDetector: React.FC = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const { error } = useGetUserInfoQuery(undefined, {
    skip: !isLogin
  });

  useEffect(() => {
    if (!lo.isEmpty(error)) {
      console.error(error);

      if (lo.isNumber((error as any).status)) {
        switch ((error as any).status) {
          case 401:
          case 403:
            dispatch(logout());
        }
      }
    }
  }, [error]);

  return null;
};

export default AccountStateDetector;
