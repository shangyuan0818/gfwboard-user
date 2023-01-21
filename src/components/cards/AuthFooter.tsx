// material-ui
import { Theme } from "@mui/material/styles";
import { useMediaQuery, Container, Link, Typography, Stack } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { useMemo } from "react";
import dayjs from "dayjs";

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const pastYear = 2022;

const AuthFooter = () => {
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const { t } = useTranslation();

  const date = useMemo(() => {
    const year = dayjs().year();
    return year > pastYear ? `${pastYear}-${year}` : `${pastYear}`;
  }, [pastYear, dayjs]);

  const AppTrans = useMemo(() => Trans, [t]);

  return (
    <Container maxWidth="xl">
      <Stack
        direction={matchDownSM ? "column" : "row"}
        justifyContent={matchDownSM ? "center" : "space-between"}
        spacing={2}
        textAlign={matchDownSM ? "center" : "inherit"}
      >
        <Typography variant="subtitle2" color="secondary" component="span">
          <AppTrans i18nKey={"auth.footer.copyright"} tOptions={{ date }}>
            <Link href="https://github.com/star-horizon" target="_blank" color="secondary" underline="hover" />
          </AppTrans>
        </Typography>

        <Stack
          direction={matchDownSM ? "column" : "row"}
          spacing={matchDownSM ? 1 : 3}
          textAlign={matchDownSM ? "center" : "inherit"}
        >
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href={"/terms"}
            target="_blank"
            underline="hover"
          >
            {t("auth.footer.links.terms")}
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href={"/privacy-policy"}
            target="_blank"
            underline="hover"
          >
            {t("auth.footer.links.privacy")}
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default AuthFooter;
