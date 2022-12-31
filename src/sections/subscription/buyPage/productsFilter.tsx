import React from "react";
import MainCard from "@/components/MainCard";
import SimpleBar from "@/components/third-party/SimpleBar";
import { Checkbox, FormControl, FormControlLabel, FormLabel, OutlinedInput, Stack, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import useConfig from "@/hooks/useConfig";
import { PlanType, useShopContext } from "./context";
import { makeStyles } from "@/themes/hooks";
import { SearchOutlined } from "@ant-design/icons";

const useStyles = makeStyles<{ container: boolean; open: boolean }>()((theme, { container, open }) => ({
  drawer: {
    height: "100%",
    width: 280,
    [theme.breakpoints.only("lg")]: {
      width: container ? 240 : undefined
    },
    flexShrink: 0,
    zIndex: 1100,
    [theme.breakpoints.up("lg")]: {
      zIndex: 0
    },
    marginRight: open ? theme.spacing(2.5) : 0,
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(2.5),
      width: 240
    },
    [theme.breakpoints.up("sm")]: {
      position: "sticky",
      zIndex: 0
    }
  },
  drawerPaper: {
    height: "auto",
    width: 280,
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      width: 240
    },
    [theme.breakpoints.only("lg")]: {
      width: container ? 240 : undefined
    },
    boxSizing: "border-box",
    position: "relative",
    boxShadow: "none"
  },
  card: {
    height: "100%"
  }
}));

const ProductsFilter: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { container } = useConfig();
  const { drawerOpen, setDrawerOpen, planType, togglePlanType } = useShopContext();
  const { classes } = useStyles({ container, open: drawerOpen });

  return (
    <Drawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
      variant={isMobile ? "temporary" : "persistent"}
      anchor="left"
      open={drawerOpen}
      ModalProps={{ keepMounted: true }}
      onClose={() => setDrawerOpen(false)}
    >
      <MainCard title={t("subscription.filter-card.title")} className={classes.card}>
        <SimpleBar>
          <Stack
            direction={"column"}
            spacing={{
              xs: 2,
              sm: 2.5,
              md: 3
            }}
          >
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ mb: 1 }} focused={false}>
                {t("subscription.filter-card.plan-type.title")}
              </FormLabel>
              {[PlanType.PERIOD, PlanType.TRAFFIC].map((type) => (
                <FormControlLabel
                  key={type}
                  value="end"
                  control={<Checkbox checked={planType.includes(type)} onClick={() => togglePlanType(type)} />}
                  label={t(`subscription.filter-card.plan-type.${type}`).toString()}
                  labelPlacement="end"
                  sx={{ ml: 1 }}
                />
              ))}
            </FormControl>
          </Stack>
        </SimpleBar>
      </MainCard>
    </Drawer>
  );
};

export default ProductsFilter;
