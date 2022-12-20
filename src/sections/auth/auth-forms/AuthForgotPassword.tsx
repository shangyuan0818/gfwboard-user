import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
import useScriptRef from "@/hooks/useScriptRef";
import AnimateButton from "@/components/@extended/AnimateButton";
import { useSelector } from "@/store";
import { useResetPasswordMutation } from "@/store/services/api";

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

const AuthForgotPassword = () => {
  const scriptedRef = useScriptRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const [resetPassword, {}] = useResetPasswordMutation();

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          email_code: "",
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email("Must be a valid email").max(255).required("Email is required")
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await resetPassword(values)
              .unwrap()
              .then(
                () => {
                  setStatus({ success: true });
                  setSubmitting(false);
                  // TODO: translate
                  enqueueSnackbar("Check mail for reset password link", {
                    variant: "success"
                  });
                  setTimeout(() => {
                    navigate(isLoggedIn ? "/auth/check-mail" : "/check-mail", { replace: true });
                  }, 1500);

                  // WARNING: do not set any formik state here as formik might be already destroyed here. You may get following error by doing so.
                  // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
                  // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
                  // github issue: https://github.com/formium/formik/issues/2430
                },
                (err: any) => {
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                  setSubmitting(false);
                }
              );
          } catch (err: any) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-forgot">Email Address</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-forgot"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-forgot">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12} sx={{ mb: -2 }}>
                <Typography variant="caption">Do not forgot to check SPAM box.</Typography>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Send Password Reset Email
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthForgotPassword;
