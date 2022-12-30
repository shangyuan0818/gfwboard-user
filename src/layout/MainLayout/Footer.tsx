import { Link as RouterLink } from "react-router-dom";

// material-ui
import { Link, Stack, Typography } from "@mui/material";
import { Trans } from "react-i18next";

// project import
import { useGetUserConfigQuery } from "@/store/services/api";
import { makeStyles } from "@/themes/hooks";

const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(3, 2, 0),
    marginTop: "auto"
  },
  right: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
}));

const Footer = () => {
  const { data } = useGetUserConfigQuery();
  const { classes } = useStyles();

  return (
    <Stack direction="row" className={classes.root}>
      <Typography variant="caption">
        <Trans i18nKey={"layout.footer.copyright"}>&copy; All rights reserved</Trans>
      </Typography>
      <Stack spacing={1.5} direction="row" className={classes.right}>
        {data?.telegram_discuss_link && (
          <Link href={data?.telegram_discuss_link} target="_blank" variant="caption" color="textPrimary">
            <Trans i18nKey={"layout.footer.contact-us"}>Contact us</Trans>
          </Link>
        )}
        <Link component={RouterLink} to="/privacy" target="_blank" variant="caption" color="textPrimary">
          <Trans i18nKey={"layout.footer.privacy-policy"}>Privacy</Trans>
        </Link>
        <Link component={RouterLink} to="/terms" target="_blank" variant="caption" color="textPrimary">
          <Trans i18nKey={"layout.footer.terms-of-service"}>Terms</Trans>
        </Link>
      </Stack>
    </Stack>
  );
};

export default Footer;
