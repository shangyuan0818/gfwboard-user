import { useEffect, useState } from "react";
import constate from "constate";

// project imports
import { useCheckOrderQuery, useGetOrderDetailQuery } from "@/store/services/api";
import { OrderStatus } from "@/model/order";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";

export interface CheckoutPageContext {
  tradeNo: string;
}

const useContext = ({ tradeNo }: CheckoutPageContext) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [status, setStatus] = useState<OrderStatus>(OrderStatus.PENDING);

  const detailQuery = useGetOrderDetailQuery(tradeNo);
  const callbackQuery = useCheckOrderQuery(tradeNo, {
    skip: status !== OrderStatus.PENDING || !detailQuery.isSuccess,
    pollingInterval: 1000
  });

  // check order status
  useEffect(() => {
    if (detailQuery.data?.status) {
      setStatus(detailQuery.data.status);
    }
  }, [detailQuery.data?.status]);

  // sync status from callback
  useEffect(() => {
    if (callbackQuery.data) {
      setStatus(callbackQuery.data);
    }
  }, [callbackQuery.data]);

  // check if order error
  useEffect(() => {
    if (detailQuery.error) {
      enqueueSnackbar(
        t("notice::order-detail-error", {
          error: detailQuery.error.message
        }),
        { variant: "error" }
      );
    }
  }, [detailQuery.error]);

  return {
    tradeNo,
    status,
    detail: detailQuery,
    callback: callbackQuery
  };
};

const [CheckoutProvider, useCheckoutContext] = constate(useContext);
export { CheckoutProvider, useCheckoutContext };
