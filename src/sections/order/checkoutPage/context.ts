import { useEffect, useState } from "react";
import constate from "constate";

// project imports
import { useCheckOrderQuery, useGetOrderDetailQuery } from "@/store/services/api";
import { OrderStatus } from "@/model/order";

export interface CheckoutPageContext {
  tradeNo: string;
}

const useContext = ({ tradeNo }: CheckoutPageContext) => {
  const [status, setStatus] = useState<OrderStatus>(OrderStatus.PENDING);

  const detailQuery = useGetOrderDetailQuery(tradeNo);
  const callbackQuery = useCheckOrderQuery(tradeNo, {
    skip: status !== OrderStatus.PENDING,
    pollingInterval: 1000
  });

  useEffect(() => {
    if (detailQuery.data?.status) {
      setStatus(detailQuery.data.status);
    }
  }, [detailQuery.data?.status]);

  useEffect(() => {
    if (callbackQuery.data) {
      setStatus(callbackQuery.data);
    }
  }, [callbackQuery.data]);

  return {
    tradeNo,
    status,
    detail: detailQuery,
    callback: callbackQuery
  };
};

const [CheckoutProvider, useCheckoutContext] = constate(useContext);
export { CheckoutProvider, useCheckoutContext };
