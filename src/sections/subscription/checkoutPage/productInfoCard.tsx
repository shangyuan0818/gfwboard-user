import React, { useMemo } from "react";

// third-party
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

// material-ui
import { Grid, Skeleton, Typography } from "@mui/material";

// project imports
import MainCard from "@/components/MainCard";
import { useCheckoutContext } from "@/sections/subscription/checkoutPage/context";
import { PaymentPeriod } from "@/types/plan";

const ProductInfoCard: React.FC = () => {
  const { t } = useTranslation();
  const {
    detail: { data, isLoading }
  } = useCheckoutContext();

  const nextBillingDate = useMemo(() => {
    const base = dayjs.unix(data?.created_at || 0);
    switch (data?.period) {
      case PaymentPeriod.MONTHLY:
        return base.add(1, "month");
      case PaymentPeriod.QUARTERLY:
        return base.add(3, "month");
      case PaymentPeriod.HALF_YEARLY:
        return base.add(6, "month");
      case PaymentPeriod.YEARLY:
        return base.add(1, "year");
      case PaymentPeriod.TWO_YEARLY:
        return base.add(2, "year");
      case PaymentPeriod.THREE_YEARLY:
        return base.add(3, "year");
      default:
        return base;
    }
  }, [data?.created_at, data?.period]);

  const lines = useMemo(
    () => [
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {t("subscription.checkout.product-info-card.product-name")}
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" noWrap>
            {data?.plan.name}
          </Typography>
        </Grid>
      </Grid>,
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {t("subscription.checkout.product-info-card.product-type")}
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" noWrap>
            {t("subscription.checkout.product-info-card.product-period", {
              context: data?.period
            })}
          </Typography>
        </Grid>
      </Grid>,
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {t("subscription.checkout.product-info-card.traffic")}
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" noWrap>
            {t("subscription.checkout.product-info-card.traffic", {
              count: data?.plan.transfer_enable || 0,
              context: data?.plan.transfer_enable === null ? "unlimited" : "limited"
            })}
          </Typography>
        </Grid>
      </Grid>,
      ...(data?.period === PaymentPeriod.ONETIME
        ? []
        : [
            <Grid container spacing={2}>
              <Grid item xs={4}>
                {t("subscription.checkout.product-info-card.next-billing-date")}
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" noWrap>
                  {nextBillingDate.format("YYYY/MM/DD")}
                </Typography>
              </Grid>
            </Grid>
          ])
    ],
    [data, t]
  );

  return (
    <MainCard title={t("subscription.checkout.product-info-card.title")}>
      <Grid container spacing={1}>
        {lines.map((line, index) => (
          <Grid item xs={12} key={index}>
            {!isLoading && line}
            {isLoading && (
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Skeleton variant="text" width="100%" />
                </Grid>
                <Grid item xs={8}>
                  <Skeleton variant="text" width="100%" />
                </Grid>
              </Grid>
            )}
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
};

export default ProductInfoCard;
