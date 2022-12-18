import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// project import
import { useSelector } from "@/store";
import config from "@/config";

// types
import { GuardProps } from "@/types/auth";

// ==============================|| GUEST GUARD ||============================== //

const GuestGuard = ({ children }: GuardProps) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(config.defaultPath, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return children;
};

export default GuestGuard;
