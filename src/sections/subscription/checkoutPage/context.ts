import constate from "constate";

// project imports
import { useCheckOrderQuery, useGetOrderDetailQuery } from "@/store/services/api";

export interface CheckoutPageContext {
  tradeNo: string;
}

const useContext = ({ tradeNo }: CheckoutPageContext) => {
  const detailQuery = useGetOrderDetailQuery(tradeNo);
  const callbackQuery = useCheckOrderQuery(tradeNo, {
    skip: detailQuery.data?.status === 2,
    pollingInterval: 1000
  });

  return {
    tradeNo,
    detail: detailQuery,
    callback: callbackQuery
  };
};

const [CheckoutProvider, useCheckoutContext] = constate(useContext);
export { CheckoutProvider, useCheckoutContext };
