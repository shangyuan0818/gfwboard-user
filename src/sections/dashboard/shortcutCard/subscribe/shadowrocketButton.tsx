import React from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";

// project imports
import MantisAvatar from "@/components/@extended/Avatar";
import { useGetUserSubscriptionQuery } from "@/store/services/api";
import { Base64Encode } from "@/utils/crypto";

// asset imports
import shadowrocketIcon from "@/assets/images/software/shadowrocket.png";

const ShadowrocketButton: React.FC = () => {
  const { t } = useTranslation();
  const { data: subscribeInfo } = useGetUserSubscriptionQuery();

  const handleClick = () => {
    if (subscribeInfo) {
      const url = new URL(subscribeInfo.subscribe_url);
      url.searchParams.set("flag", "shadowrocket");
      window.open(
        `shadowrocket://add/sub://${Base64Encode(url.toString())}?remark=${encodeURIComponent(window.settings.title)}`,
        "_self"
      );
    }
  };

  return (
    <ListItem disablePadding divider>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <MantisAvatar alt="Shadowrocket" type="combined" color="secondary" src={shadowrocketIcon} />
        </ListItemAvatar>
        <ListItemText primary={t("dashboard.shortcut.subscribe.shadowrocket")} />
      </ListItemButton>
    </ListItem>
  );
};

export default ShadowrocketButton;
