import React, { useMemo } from "react";
import MainCard from "@/components/MainCard";
import { useTranslation } from "react-i18next";
import { List, ListItem, ListItemButton, ListItemText, Skeleton } from "@mui/material";
import { useCheckoutContext } from "@/sections/order/checkoutPage/context";

const PaymentMethodCard: React.FC = () => {
  const { t } = useTranslation();
  const {
    paymentMethod: { isLoading },
    detail: { isLoading: isDetailLoading },
    paymentMethodIndex,
    paymentMethodState,
    setPaymentMethodState
  } = useCheckoutContext();

  const data = useMemo(() => Array.from(paymentMethodIndex.values()), [paymentMethodIndex]);

  return (
    <MainCard title={t("order.checkout.payment-method-card.title")} content={false}>
      <List sx={{ p: 0 }}>
        {isLoading || isDetailLoading
          ? Array.from(new Array(3)).map((_, index) => (
              <ListItem disablePadding divider key={index}>
                <ListItemButton>
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
                  onClick={(e) => {
                    e.preventDefault();
                    setPaymentMethodState(method.id);
                  }}
                >
                  <ListItemText>{method.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
      </List>
    </MainCard>
  );
};

export default PaymentMethodCard;
