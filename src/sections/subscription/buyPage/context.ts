import { useEffect, useState } from "react";
import { useSet, useToggle } from "ahooks";
import constate from "constate";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { PaymentPeriod, paymentPriority, PlanType } from "@/types/plan";

const useShop = () => {
  const [planTypeAllow, { add: addPlanType, remove: removePlanType, reset: resetPlanType }] = useSet([
    PlanType.PERIOD,
    PlanType.TRAFFIC
  ]);
  const [paymentAllow, { add: addPayment, remove: removePayment, reset: resetPayment }] = useSet(paymentPriority);
  const [keyword, setKeyword] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, { set: setDrawerOpen, toggle: toggleDrawer }] = useToggle(!isMobile);

  const togglePlanType = (type: PlanType) => {
    if (planTypeAllow.has(type)) {
      removePlanType(type);
    } else {
      addPlanType(type);
    }
  };

  const togglePayment = (key: PaymentPeriod) => {
    if (paymentAllow.has(key)) {
      removePayment(key);
    } else {
      addPayment(key);
    }
  };

  useEffect(() => {
    console.log(planTypeAllow);
  }, [planTypeAllow]);

  return {
    planType: planTypeAllow,
    addPlanType,
    removePlanType,
    resetPlanType,
    togglePlanType,
    keyword,
    setKeyword,
    drawerOpen,
    setDrawerOpen,
    toggleDrawer,
    paymentAllow,
    addPayment,
    removePayment,
    resetPayment,
    togglePayment
  };
};

const [ShopProvider, useShopContext] = constate(useShop);

export { ShopProvider, useShopContext };
