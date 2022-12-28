import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQRCode } from "next-qrcode";

// material-ui
import {
  Dialog,
  DialogContent,
  DialogTitle,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";
import { QrcodeOutlined } from "@ant-design/icons";

// project imports
import MantisAvatar from "@/components/@extended/Avatar";
import { useGetUserSubscriptionQuery } from "@/store/services/api";

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

export default ScanQRCodeButton;
