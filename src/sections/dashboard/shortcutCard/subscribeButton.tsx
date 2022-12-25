import React, { useMemo, useState } from "react";

// material-ui
import {
  Dialog,
  DialogTitle,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery
} from "@mui/material";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { useTheme } from "@mui/material/styles";

// third-party
import { useTranslation } from "react-i18next";
import UAParser from "ua-parser-js";

// project imports
import MantisAvatar from "@/components/@extended/Avatar";
import CopyLinkButton from "./subscribe/copyLinkButton";
import ScanQRCodeButton from "./subscribe/scanQrCodeButton";
import ClashButton from "./subscribe/clashButton";
import ClashXButton from "./subscribe/clashxButton";
import SurfboardButton from "./subscribe/surfboardButton";
import SurgeButton from "./subscribe/surgeButton";
import ShadowrocketButton from "./subscribe/shadowrocketButton";
import QuantumultXButton from "./subscribe/quantumultxButton";
import StashButton from "./subscribe/stashButton";

const SubscribeButton: React.FC = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const Modal = useMemo(() => (isMobile ? Drawer : Dialog), [isMobile, window.innerWidth]);

  const UserAgentData = useMemo(() => new UAParser(window.navigator.userAgent).getResult(), []);
  console.log("UserAgentData", UserAgentData);

  return (
    <>
      <ListItem disablePadding divider>
        <ListItemButton onClick={() => setOpen(true)}>
          <ListItemAvatar>
            <MantisAvatar alt="Subscribe" type="combined" color="info">
              <CloudDownloadOutlined />
            </MantisAvatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant={"body1"} noWrap>
                {t("dashboard.shortcut.subscribe.primary")}
              </Typography>
            }
            secondary={
              <Typography variant={"caption"} color={"secondary"} noWrap>
                {t("dashboard.shortcut.subscribe.secondary")}
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
      <Modal open={open} onClose={() => setOpen(false)} anchor={"bottom"}>
        <DialogTitle>{t("dashboard.shortcut.subscribe.primary")}</DialogTitle>
        <List
          sx={{
            pt: 0,
            minWidth: {
              xs: 0,
              sm: 300
            }
          }}
        >
          <CopyLinkButton />
          <ScanQRCodeButton />
          {UserAgentData.os.name === "Windows" && [<ClashButton />]}
          {UserAgentData.os.name === "Android" && [<ClashButton />, <SurfboardButton />]}
          {UserAgentData.os.name === "Mac OS" && [<ClashXButton />, <SurgeButton />]}
          {UserAgentData.os.name === "iOS" && [
            <ShadowrocketButton />,
            <QuantumultXButton />,
            <SurgeButton />,
            <StashButton />
          ]}
          {UserAgentData.os.name === "Linux" && [<ClashButton />]}
        </List>
      </Modal>
    </>
  );
};

export default SubscribeButton;
