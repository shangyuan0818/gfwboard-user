import React, { useMemo } from "react";

// third-party
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

// material-ui
import { Grid, Skeleton, Typography } from "@mui/material";

// project imports
import MainCard from "@/components/MainCard";
import { useCheckoutContext } from "./context";
import { OrderStatus } from "@/model/order";

export interface LineProps {
  label: string;
  value: React.ReactNode;
}

const OrderInfoCard: React.FC = () => {
  const { t } = useTranslation();

  const {
    detail: { data, isLoading },
    status
  } = useCheckoutContext();

  const statusContext = useMemo(() => {
    switch (status) {
      case OrderStatus.PAID:
        return "paid";
      case OrderStatus.CANCELLED:
        return "cancelled";
      case OrderStatus.PENDING:
        return "pending";
      default:
        return null;
    }
  }, [status]);

  const lines = useMemo<LineProps[]>(
    () => [
      {
        label: t("order.checkout.order-info-card.order-number"),
        value: data?.trade_no
      },
      {
        label: t("order.checkout.order-info-card.order-date"),
        value: dayjs.unix(data?.created_at || 0).format("YYYY-MM-DD HH:mm:ss")
      },
      {
        label: t("order.checkout.order-info-card.order-status"),
        value: t("order.checkout.order-info-card.order-status-value", {
          context: statusContext
        })
      },
      {
        label: t("order.checkout.order-info-card.coupon-amount"),
        value: t("order.checkout.order-info-card.price", {
          value: (Number(data?.discount_amount || 0) / 100).toFixed(2)
        })
      },
      {
        label: t("order.checkout.order-info-card.order-amount"),
        value: t("order.checkout.order-info-card.price", {
          value: (Number(data?.total_amount || 0) / 100).toFixed(2)
        })
      }
    ],
    [data, t]
  );

  return (
    <MainCard title={t("order.checkout.order-info-card.title")}>
      <Grid container spacing={2}>
        {lines.map((line, index) => (
          <Grid item xs={12} key={index}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                {line.label}
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" noWrap>
                  {isLoading ? <Skeleton variant="text" width="100%" /> : line.value}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
};

export default OrderInfoCard;
