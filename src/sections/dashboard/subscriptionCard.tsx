import React, { useMemo } from "react";
import MainCard from "@/components/MainCard";
import {
  Box,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  LinearProgress,
  Stack,
  Typography
} from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { useGetUserSubscriptionQuery } from "@/store/services/api";
import dayjs from "dayjs";
import lo from "lodash-es";

const SubscriptionCard: React.FC = () => {
  const { data: subscriptionInfo } = useGetUserSubscriptionQuery();
  const { t } = useTranslation();

  const trafficUsed = useMemo(
    () => (subscriptionInfo ? (subscriptionInfo?.u + subscriptionInfo?.d) / subscriptionInfo?.transfer_enable : 1),
    [subscriptionInfo]
  );

  return (
    <MainCard>
      <Typography variant={"h5"} mb={2}>
        <Trans i18nKey={"dashboard.subscription-card.title"}>My Subscription</Trans>
      </Typography>
      <Divider />
      {subscriptionInfo ? (
        <Stack mt={2} spacing={2}>
          <Typography component={"h6"} variant={"h4"}>
            {subscriptionInfo.plan.name}
          </Typography>
          <Typography variant={"body1"}>
            {t("dashboard.subscription-card.expire", {
              context: subscriptionInfo.expired_at === null ? "forever" : "limited",
              date: dayjs.unix(subscriptionInfo.expired_at || 0).format("YYYY/MM/DD"),
              reset_date: subscriptionInfo.reset_day,
              count:
                subscriptionInfo.expired_at !== null
                  ? Math.max(dayjs.unix(subscriptionInfo.expired_at!).diff(dayjs(), "day"), 0)
                  : undefined
            })}
          </Typography>
          <LinearProgress variant={"determinate"} value={trafficUsed * 100} />
          <Typography variant={"body1"}>
            {t("dashboard.subscription-card.traffic", {
              used: lo.round((subscriptionInfo.u + subscriptionInfo.d) / 1073741824, 2),
              total: lo.round(subscriptionInfo.transfer_enable / 1073741824, 2)
            })}
          </Typography>
        </Stack>
      ) : (
        <CircularProgress />
      )}
    </MainCard>
  );
};

export default SubscriptionCard;
