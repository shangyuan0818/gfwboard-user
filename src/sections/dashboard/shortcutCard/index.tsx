import React from "react";
import { List } from "@mui/material";
import { useTranslation } from "react-i18next";
import MainCard from "@/components/MainCard";
import TutorialButton from "@/sections/dashboard/shortcutCard/tutorialButton";
import SubscribeButton from "@/sections/dashboard/shortcutCard/subscribeButton";
import PurchaseButton from "@/sections/dashboard/shortcutCard/purchaseButton";
import TicketButton from "@/sections/dashboard/shortcutCard/ticketButton";

const ShortcutCard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <MainCard title={t("dashboard.shortcut.title")} content={false}>
      <List
        sx={{
          p: 0
        }}
      >
        <TutorialButton />
        <SubscribeButton />
        <PurchaseButton />
        <TicketButton />
      </List>
    </MainCard>
  );
};

export default ShortcutCard;
