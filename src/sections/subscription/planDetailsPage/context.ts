import { useState } from "react";
import constate from "constate";

// project imports
import { useGetPlanQuery } from "@/store/services/api";
import { PaymentPeriod } from "@/types/plan";

export interface PlanDetailContextProps {
  id: number;
}

const usePlanDetail = ({ id }: PlanDetailContextProps) => {
  const planQuery = useGetPlanQuery(id, {
    skip: !id
  });
  const [period, setPeriod] = useState<PaymentPeriod | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return {
    id,
    planQuery,
    period,
    setPeriod,
    isSubmitting,
    setIsSubmitting
  };
};

const [PlanDetailProvider, usePlanDetailContext] = constate(usePlanDetail);
export { PlanDetailProvider, usePlanDetailContext };
