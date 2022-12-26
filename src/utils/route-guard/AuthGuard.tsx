import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// project import
import { useSelector } from "@/store";

// types
import { GuardProps } from "@/types/auth";

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }: GuardProps) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return children;
};

export default AuthGuard;
