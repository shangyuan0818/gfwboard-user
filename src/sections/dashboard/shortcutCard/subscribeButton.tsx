import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
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
import MantisAvatar from "@/components/@extended/Avatar";
import { useTranslation } from "react-i18next";
import { CloudDownloadOutlined, CopyOutlined, QrcodeOutlined } from "@ant-design/icons";
import { useTheme } from "@mui/material/styles";
import { useGetUserSubscriptionQuery } from "@/store/services/api";
import { useSnackbar } from "notistack";
import { useQRCode } from "next-qrcode";
import UAParser from "ua-parser-js";
import clashIcon from "@/assets/images/software/clash.png";

const CopyLinkButton: React.FC = () => {
  const { t } = useTranslation();
  const { data: subscribeInfo } = useGetUserSubscriptionQuery();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    if (subscribeInfo) {
      navigator.clipboard.writeText(subscribeInfo.subscribe_url).then(() => {
        enqueueSnackbar(t("notice::copy_success"), {
          variant: "success"
        });
      });
    } else {
      enqueueSnackbar(t("notice::copy_fail"), {
        variant: "error"
      });
    }
  };

  return (
    <ListItem disablePadding divider>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <MantisAvatar alt="Copy" type="combined" color="secondary">
            <CopyOutlined />
          </MantisAvatar>
        </ListItemAvatar>
        <ListItemText primary={t("dashboard.shortcut.subscribe.copy")} />
      </ListItemButton>
    </ListItem>
  );
};

const ScanQRCodeButton: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { data: subscribeInfo } = useGetUserSubscriptionQuery();
  const { Canvas } = useQRCode();

  return (
    <>
      <ListItem disablePadding divider>
        <ListItemButton onClick={() => setOpen(true)}>
          <ListItemAvatar>
            <MantisAvatar alt="Scan QRCode" type="combined" color="secondary">
              <QrcodeOutlined />
            </MantisAvatar>
          </ListItemAvatar>
          <ListItemText primary={t("dashboard.shortcut.subscribe.scan")} />
        </ListItemButton>
      </ListItem>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t("dashboard.shortcut.subscribe.scan")}</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {subscribeInfo && (
            <Canvas
              text={subscribeInfo.subscribe_url}
              options={{
                level: "H"
              }}
            />
          )}
          <Typography variant="body2" color="textSecondary">
            {t("dashboard.shortcut.subscribe.scan_tips")}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

const ClashButton: React.FC = () => {
  const { t } = useTranslation();
  const { data: subscribeInfo } = useGetUserSubscriptionQuery();

  const handleClick = () => {
    if (subscribeInfo) {
      window.open(`clash://install-config?url=${encodeURIComponent(subscribeInfo.subscribe_url)}`);
    }
  };

  return (
    <ListItem disablePadding divider>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <MantisAvatar alt="Copy" type="combined" color="secondary" src={clashIcon} />
        </ListItemAvatar>
        <ListItemText primary={t("dashboard.shortcut.subscribe.clash")} />
      </ListItemButton>
    </ListItem>
  );
};

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
          {UserAgentData.os.name === "Windows" && <ClashButton />}
          {UserAgentData.os.name === "Mac OS" && <ClashButton />}
          {UserAgentData.os.name === "Android" && <ClashButton />}
        </List>
      </Modal>
    </>
  );
};

export default SubscribeButton;
