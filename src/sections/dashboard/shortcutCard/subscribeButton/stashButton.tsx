import React from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";

// project imports
import { useGetUserSubscriptionQuery } from "@/store/services/api";
import MantisAvatar from "@/components/@extended/Avatar";

// asset imports
import stashIcon from "@/assets/images/software/stash.png";

const StashButton: React.FC = () => {
  const { t } = useTranslation();
  const { data: subscribeInfo } = useGetUserSubscriptionQuery();

  const handleClick = () => {
    if (subscribeInfo) {
      const url = new URL(subscribeInfo.subscribe_url);
      url.searchParams.set("flag", "stash");
      window.open(
        `stash:///install-config?url=${encodeURIComponent(url.toString())}&name=${encodeURIComponent(
          window.settings.title
        )}`,
        "_self"
      );
    }
  };

  return (
    <ListItem disablePadding divider>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <MantisAvatar alt="Stash" type="combined" color="secondary" src={stashIcon} />
        </ListItemAvatar>
        <ListItemText primary={t("dashboard.shortcut.subscribe.stash")} />
      </ListItemButton>
    </ListItem>
  );
};

export default StashButton;
