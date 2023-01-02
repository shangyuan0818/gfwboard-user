import { useState } from "react";
import constate from "constate";
import { useSet } from "ahooks";

// project imports
import { useGetPlanQuery } from "@/store/services/api";
import { PaymentPeriod } from "@/types/plan";
import Coupon from "@/model/coupon";

export interface PlanDetailContextProps {
  id: number;
}

const usePlanDetail = ({ id }: PlanDetailContextProps) => {
  const planQuery = useGetPlanQuery(id, {
    skip: !id
  });
  const [period, setPeriod] = useState<PaymentPeriod | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState<Coupon | null>(null);

  return {
    id,
    planQuery,
    period,
    setPeriod,
    isSubmitting,
    setIsSubmitting,
    couponCode,
    setCouponCode
  };
};

const [PlanDetailProvider, usePlanDetailContext] = constate(usePlanDetail);
export { PlanDetailProvider, usePlanDetailContext };
