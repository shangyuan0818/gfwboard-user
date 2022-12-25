import React, { useMemo, useState } from "react";

// material-ui
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
import { CloudDownloadOutlined, CopyOutlined, QrcodeOutlined } from "@ant-design/icons";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";

// third-party
import { useTranslation } from "react-i18next";
import { useQRCode } from "next-qrcode";
import UAParser from "ua-parser-js";
import CryptoJS from "crypto-js";

// project imports
import MantisAvatar from "@/components/@extended/Avatar";
import { useGetUserSubscriptionQuery } from "@/store/services/api";

// assets
import clashIcon from "@/assets/images/software/clash.png";
import clashxIcon from "@/assets/images/software/clashx.png";
import surfboardIcon from "@/assets/images/software/surfboard.png";
import shadowrocketIcon from "@/assets/images/software/shadowrocket.png";
import surgeIcon from "@/assets/images/software/surge.png";
import quantumultxIcon from "@/assets/images/software/quantumultx.png";
import stashIcon from "@/assets/images/software/stash.png";
import { Base64Encode } from "@/utils/crypto";

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

const SurfboardButton: React.FC = () => {
  const { t } = useTranslation();
  const { data: subscribeInfo } = useGetUserSubscriptionQuery();

  const handleClick = () => {
    if (subscribeInfo) {
      const url = new URL(subscribeInfo.subscribe_url);
      url.searchParams.set("flag", "surfboard");
      window.open(
        `surge:///install-config?url=${encodeURIComponent(url.toString())}&name=${encodeURIComponent(
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
          <MantisAvatar alt="Surfboard" type="combined" color="secondary" src={surfboardIcon} />
        </ListItemAvatar>
        <ListItemText primary={t("dashboard.shortcut.subscribe.surfboard")} />
      </ListItemButton>
    </ListItem>
  );
};

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

const QuantumultXButton: React.FC = () => {
  const { t } = useTranslation();
  const { data: subscribeInfo } = useGetUserSubscriptionQuery();

  const handleClick = () => {
    if (subscribeInfo) {
      const url = new URL(subscribeInfo.subscribe_url);
      url.searchParams.set("flag", "quantumult x");
      window.open(
        `quantumult-x:///update-configuration?remote-resource=${encodeURI(
          JSON.stringify({
            server_remote: `"${url.toString()}, tag=${window.settings.title}"`
          })
        )}`,
        "_self"
      );
    }
  };

  return (
    <ListItem disablePadding divider>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <MantisAvatar alt="Quantumult X" type="combined" color="secondary" src={quantumultxIcon} />
        </ListItemAvatar>
        <ListItemText primary={t("dashboard.shortcut.subscribe.quantumultx")} />
      </ListItemButton>
    </ListItem>
  );
};

const SurgeButton: React.FC = () => {
  const { t } = useTranslation();
  const { data: subscribeInfo } = useGetUserSubscriptionQuery();

  const handleClick = () => {
    if (subscribeInfo) {
      const url = new URL(subscribeInfo.subscribe_url);
      url.searchParams.set("flag", "surge");
      window.open(
        `surge:///install-config?url=${encodeURIComponent(url.toString())}&name=${encodeURIComponent(
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
          <MantisAvatar alt="Surge" type="combined" color="secondary" src={surgeIcon} />
        </ListItemAvatar>
        <ListItemText primary={t("dashboard.shortcut.subscribe.surge")} />
      </ListItemButton>
    </ListItem>
  );
};

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
