import React from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";

// project imports
import MantisAvatar from "@/components/@extended/Avatar";
import { useGetUserSubscriptionQuery } from "@/store/services/api";

// asset imports
import clashxIcon from "@/assets/images/software/clashx.png";

const ClashXButton: React.FC = () => {
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
          <MantisAvatar alt="Clash X" type="combined" color="secondary" src={clashxIcon} />
        </ListItemAvatar>
        <ListItemText primary={t("dashboard.shortcut.subscribe.clashx")} />
      </ListItemButton>
    </ListItem>
  );
};

export default ClashXButton;
