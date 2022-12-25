import React from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";

// project imports
import MantisAvatar from "@/components/@extended/Avatar";
import { useGetUserSubscriptionQuery } from "@/store/services/api";

// asset imports
import clashIcon from "@/assets/images/software/clash.png";

const ClashButton: React.FC = () => {
  const { t } = useTranslation();
  const { data: subscribeInfo } = useGetUserSubscriptionQuery();

  const handleClick = () => {
    if (subscribeInfo) {
      const url = new URL(subscribeInfo.subscribe_url);
      url.searchParams.set("flag", "clash");
      window.open(`clash://install-config?url=${encodeURIComponent(url.toString())}`, "_self");
    }
  };

  return (
    <ListItem disablePadding divider>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <MantisAvatar alt="Clash" type="combined" color="secondary" src={clashIcon} />
        </ListItemAvatar>
        <ListItemText primary={t("dashboard.shortcut.subscribe.clash")} />
      </ListItemButton>
    </ListItem>
  );
};

export default ClashButton;
