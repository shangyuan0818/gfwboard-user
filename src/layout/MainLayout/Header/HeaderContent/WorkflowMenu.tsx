import { useRef, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Popper,
  Typography,
  useMediaQuery
} from "@mui/material";

// project import
import MainCard from "@/components/MainCard";
import IconButton from "@/components/@extended/IconButton";
import Transitions from "@/components/@extended/Transitions";
import { makeStyles } from "@/themes/hooks";

// assets
import { BellOutlined, GiftOutlined } from "@ant-design/icons";

const useStyles = makeStyles<{ open: boolean }>()((theme, { open }) => ({
  root: { flexShrink: 0 },
  icon: {
    color: theme.palette.text.primary,
    backgroundColor: open ? theme.palette.grey[300] : theme.palette.grey[100],
    ["@media (prefers-color-scheme: dark)"]: {
      backgroundColor: open ? theme.palette.grey[200] : theme.palette.background.default
    }
  },
  paper: {
    boxShadow: theme.customShadows.z1,
    width: "100%",
    minWidth: 285,
    maxWidth: 420,
    [theme.breakpoints.down("md")]: {
      maxWidth: 285
    }
  },
  nav: {
    padding: 0
  },
  itemButton: {
    padding: theme.spacing(0.5, 0)
  },
  listItemTextTypography: {
    color: theme.palette.text.primary
  },
  listItemSecondary: {
    margin: theme.spacing(0.75, 0.5),
    top: "auto",
    right: "auto",
    alignSelf: "flex-start",
    transform: "none",
    position: "relative",
    color: theme.palette.text.secondary
  },
  viewAllButton: {
    textAlign: "center",
    paddingTop: `${theme.spacing(1.5)} !important`,
    paddingBottom: `${theme.spacing(1.5)} !important`
  },
  listItemText: {
    margin: theme.spacing(0.75, 0.75)
  },
  listItemAvatar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  iconAvatar: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    fontSize: "1rem",
    color: theme.palette.success.main,
    backgroundColor: theme.palette.success.lighter
  }
}));

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const WorkflowMenu = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));

  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const { classes, cx } = useStyles({ open });

  return (
    <Box className={classes.root}>
      <IconButton
        color="secondary"
        className={classes.icon}
        variant="light"
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={0} color="primary">
          <BellOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? "bottom" : "bottom-end"}
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
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard title="Notification" elevation={0} border={false} content={false}>
                  <List component="nav" className={classes.nav}>
                    <ListItemButton className={classes.itemButton}>
                      <ListItemAvatar className={classes.listItemAvatar}>
                        <Avatar className={classes.iconAvatar}>
                          <GiftOutlined />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        className={classes.listItemText}
                        primary={
                          <Typography variant="h6" className={classes.listItemTextTypography}>
                            It&apos;s{" "}
                            <Typography component="span" variant="subtitle1">
                              Cristina danny&apos;s
                            </Typography>{" "}
                            birthday today.
                          </Typography>
                        }
                        secondary="2 min ago"
                      />
                      <ListItemSecondaryAction className={classes.listItemSecondary}>
                        <Typography variant="caption" noWrap>
                          3:00 AM
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton className={cx(classes.itemButton, classes.viewAllButton)}>
                      <ListItemText
                        primary={
                          <Typography variant="h6" color="primary">
                            View All
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default WorkflowMenu;
