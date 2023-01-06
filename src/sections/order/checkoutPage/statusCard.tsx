import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { Stack, Typography } from "@mui/material";

// project imports
import MainCard from "@/components/MainCard";
import { useCheckoutContext } from "./context";
import { OrderStatus } from "@/model/order";
import { makeStyles } from "@/themes/hooks";

// assets
import { CheckCircleFilled, WarningFilled } from "@ant-design/icons";

const useStyles = makeStyles<{
  status: OrderStatus;
}>()((theme, { status }) => ({
  root: {
    padding: theme.spacing(1)
  },
  icon: {
    fontSize: theme.spacing(8),
    color: theme.palette[status === OrderStatus.PAID ? "success" : "warning"].main
  }
}));

const StatusCard: React.FC = () => {
  const { t } = useTranslation();
  const { status } = useCheckoutContext();
  const { classes } = useStyles({ status });

  const icon = useMemo(() => {
    switch (status) {
      case OrderStatus.PAID:
        return <CheckCircleFilled className={classes.icon} />;
      case OrderStatus.CANCELLED:
        return <WarningFilled className={classes.icon} />;
      default:
        return null;
    }
  }, [status]);

  const context = useMemo(() => {
    switch (status) {
      case OrderStatus.PAID:
        return "paid";
      case OrderStatus.CANCELLED:
        return "cancelled";
      default:
        return null;
    }
  }, [status]);

  return (
    <MainCard className={classes.root}>
      <Stack direction={"column"} spacing={3}>
        {icon}
        <Stack direction={"column"} spacing={1} alignItems={"center"}>
          <Typography variant={"h3"}>{t("subscription.checkout.status-card.status", { context })}</Typography>
          <Typography variant={"body1"} color={"textSecondary"}>
            {t("subscription.checkout.status-card.description", { context })}
          </Typography>
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default StatusCard;
