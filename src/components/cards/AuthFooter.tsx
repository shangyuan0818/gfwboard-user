// material-ui
import { Theme } from "@mui/material/styles";
import { useMediaQuery, Container, Link, Typography, Stack } from "@mui/material";
import { Trans } from "react-i18next";

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="xl">
      <Stack
        direction={matchDownSM ? "column" : "row"}
        justifyContent={matchDownSM ? "center" : "space-between"}
        spacing={2}
        textAlign={matchDownSM ? "center" : "inherit"}
      >
        <Typography variant="subtitle2" color="secondary" component="span">
          <Trans i18nKey={"auth.footer.privacy"}>
            This site is protected by{" "}
            <Typography component={Link} variant="subtitle2" href="#mantis-privacy" target="_blank" underline="hover">
              Privacy Policy
            </Typography>
          </Trans>
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
            href="https://codedthemes.com"
            target="_blank"
            underline="hover"
          >
            <Trans i18nKey={"auth.footer.links.terms"}>Terms and Conditions</Trans>
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="https://codedthemes.com"
            target="_blank"
            underline="hover"
          >
            <Trans i18nKey={"auth.footer.links.privacy"}>Privacy Policy</Trans>
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default AuthFooter;
