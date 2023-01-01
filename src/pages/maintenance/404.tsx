import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// material-ui
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

// project import
import config from "@/config";
import useTitle from "@/hooks/useTitle";

// assets
import error404 from "@/assets/images/maintenance/Error404.png";
import TwoCone from "@/assets/images/maintenance/TwoCone.png";

// ==============================|| ERROR 404 - MAIN ||============================== //

const Error404: React.FC = () => {
  const { t } = useTranslation();
  useTitle("not_found");

  return (
    <>
      <Grid
        container
        spacing={10}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", pt: 1.5, pb: 1, overflow: "hidden" }}
      >
        <Grid item xs={12}>
          <Stack direction="row">
            <Grid item>
              <Box sx={{ width: { xs: 250, sm: 590 }, height: { xs: 130, sm: 300 } }}>
                <img src={error404} alt="mantis" style={{ width: "100%", height: "100%" }} />
              </Box>
            </Grid>
            <Grid item sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: 60,
                  left: -40,
                  width: { xs: 130, sm: 390 },
                  height: { xs: 115, sm: 330 }
                }}
              >
                <img src={TwoCone} alt="mantis" style={{ width: "100%", height: "100%" }} />
              </Box>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Typography variant="h1">{t("maintenance.404.title")}</Typography>
            <Typography color="textSecondary" align="center" noWrap>
              {t("maintenance.404.description")}
            </Typography>
            <Button component={Link} to={config.defaultPath} variant="contained">
              {t("maintenance.404.button")}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Error404;
