import { useRef, useState, ReactNode, SyntheticEvent, useMemo } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Divider,
  Grid,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useMediaQuery
} from "@mui/material";

// project import
import Avatar from "@/components/@extended/Avatar";
import MainCard from "@/components/MainCard";
import Transitions from "@/components/@extended/Transitions";
import IconButton from "@/components/@extended/IconButton";
import MenuList from "./MenuList";
import SettingTab from "./SettingTab";

// assets
import avatar1 from "@/assets/images/users/avatar-1.png";
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "@/store";
import { logout } from "@/store/reducers/auth";
import { useNavigate } from "react-router-dom";
import config from "@/config";
import { useGetUserInfoQuery } from "@/store/services/api";
import { useSnackbar } from "notistack";
import { Trans, useTranslation } from "react-i18next";
import { makeStyles } from "@/themes/hooks";

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const useStyles = makeStyles<{ open: boolean }>({
  name: "profile"
})((theme, { open }) => ({
  root: { flexShrink: 0, marginLeft: theme.spacing(1) },
  button: {
    padding: theme.spacing(0.25),
    backgroundColor: open
      ? theme.palette.mode === "dark"
        ? theme.palette.grey[200]
        : theme.palette.grey[300]
      : "transparent",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? theme.palette.secondary.light : theme.palette.secondary.lighter
    },
    "&:focus-visible": {
      outline: `2px solid ${theme.palette.secondary.dark}`,
      outlineOffset: 2
    }
  },
  userInfo: {
    alignItems: "center",
    padding: theme.spacing(0.5)
  },
  paper: {
    boxShadow: theme.customShadows.z1,
    width: 280,
    minWidth: 240,
    maxWidth: 280,
    [theme.breakpoints.down("md")]: {
      maxWidth: 250
    }
  },
  cardContent: {
    padding: theme.spacing(1.5, 2, 2)
  },
  userAvatar: { width: 32, height: 32 }
}));

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout());
    enqueueSnackbar(t("notice::logout_success"), { variant: "success" });
    navigate(config.defaultPath, { replace: true });
  };

  const { data: user } = useGetUserInfoQuery();

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const { classes } = useStyles({
    open
  });

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Box className={classes.root}>
      <ButtonBase
        className={classes.button}
        ref={anchorRef}
        aria-label="open profile"
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} className={classes.userInfo}>
          <Avatar alt="profile user" src={user?.avatar_url} size="xs" />
          {isMobile || <Typography variant="subtitle1">{user?.email}</Typography>}
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={"menu"}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent className={classes.cardContent}>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <Avatar alt="profile user" src={user?.avatar_url} className={classes.userAvatar} />
                            <Stack>
                              <Typography variant="h6">{user?.email}</Typography>
                              <Typography variant="body2" color="textSecondary">
                                <Trans i18nKey={"layout.header.profile.user_secondary"}>高级客户</Trans>
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        {isMobile || (
                          <Grid item>
                            <Tooltip title={t("layout.header.profile.logout_tooltip")}>
                              <IconButton size="large" color={"default"} onClick={handleLogout}>
                                <LogoutOutlined />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        )}
                      </Grid>
                    </CardContent>
                    <Divider />
                    {open && <MenuList />}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
