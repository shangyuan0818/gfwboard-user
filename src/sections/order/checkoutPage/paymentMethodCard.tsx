import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton } from "@mui/material";

// project imports
import MainCard from "@/components/MainCard";
import Avatar from "@/components/@extended/Avatar";
import { useCheckoutContext } from "@/sections/order/checkoutPage/context";
import { makeStyles } from "@/themes/hooks";

// assets
import { AlipayOutlined } from "@ant-design/icons";

const useStyles = makeStyles()((theme) => ({
  icon: {
    fontSize: theme.spacing(2.5)
  }
}));

const PaymentMethodCard: React.FC = () => {
  const { t } = useTranslation();
  const {
    paymentMethod: { isLoading },
    detail: { isLoading: isDetailLoading },
    paymentMethodIndex,
    paymentMethodState,
    setPaymentMethodState,
    isSubmitting
  } = useCheckoutContext();

  const data = useMemo(() => Array.from(paymentMethodIndex.values()), [paymentMethodIndex]);

  const { classes } = useStyles();

  const IconComponent = useCallback<React.FC<{ icon: string }>>(({ icon }: { icon: string }) => {
    switch (true) {
      case icon.includes("alipay"):
        return (
          <Avatar type="combined">
            <AlipayOutlined className={classes.icon} />
          </Avatar>
        );
      default:
        return <Avatar type="combined" color="secondary" src={icon} />;
    }
  }, []);

  return (
    <MainCard title={t("order.checkout.payment-method-card.title")} content={false}>
      <List sx={{ p: 0 }}>
        {isLoading || isDetailLoading
          ? Array.from(new Array(3)).map((_, index) => (
              <ListItem disablePadding divider key={index}>
                <ListItemButton disabled>
                  <ListItemText>
                    <Skeleton variant="text" width={100} />
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))
          : data.map((method) => (
              <ListItem disablePadding divider key={method.id}>
                <ListItemButton
                  selected={paymentMethodState === method.id}
                  disabled={isSubmitting}
                  onClick={(e) => {
                    e.preventDefault();
                    setPaymentMethodState(method.id);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    setPaymentMethodState(method.id);
                  }}
                >
                  {method.icon && (
                    <ListItemAvatar>
                      <IconComponent icon={method.icon} />
                    </ListItemAvatar>
                  )}
                  <ListItemText>{method.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
      </List>
    </MainCard>
  );
};

export default PaymentMethodCard;
