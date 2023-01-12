import React, { useState } from "react";
import MainCard from "@/components/MainCard";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useGetInviteDataQuery, useTransferMoneyMutation } from "@/store/services/api";
import { useToggle } from "ahooks";
import config from "@/config";
import { Formik } from "formik";
import * as Yup from "yup";
import lo from "lodash-es";

const TransferButton: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useGetInviteDataQuery();
  const [transfer] = useTransferMoneyMutation();

  const [open, { setLeft: setClose, setRight: setOpen }] = useToggle(false);

  return (
    <>
      <Button variant={"contained"} onClick={setOpen}>
        {t("invite.my-invite.invitation-card.transfer-button")}
      </Button>
      <Dialog open={open} onClose={setClose} fullWidth>
        <DialogTitle>{t("invite.my-invite.invitation-card.transfer-dialog.title")}</DialogTitle>
        <Formik
          initialValues={{
            transfer_amount: 0
          }}
          validationSchema={Yup.object().shape({
            transfer_amount: Yup.number()
              .min(
                0.01,
                t("invite.my-invite.invitation-card.transfer-dialog.validation_min", { count: 0.1 }).toString()
              )
              .max(
                (data?.stat[4] ?? 0) / 100,
                t("invite.my-invite.invitation-card.transfer-dialog.validation_max", {
                  count: (data?.stat[4] ?? 0) / 100
                }).toString()
              )
              .required(t("invite.my-invite.invitation-card.transfer-dialog.validation_required").toString())
          })}
          onSubmit={async (values, { setSubmitting, setErrors, setStatus }) => {
            try {
              setSubmitting(true);
              await transfer(values.transfer_amount * 100).unwrap();
              setStatus({ success: true });
            } catch (err: any) {
              setErrors(lo.isEmpty(err.errors) ? { submit: err.message } : err.errors);
              setStatus({ success: false });
            } finally {
              setSubmitting(false);
              setClose();
            }
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched }) => (
            <Box component={"form"} onSubmit={handleSubmit}>
              <DialogContent>
                <Stack spacing={3}>
                  <Alert severity={"info"}>
                    {t("invite.my-invite.invitation-card.transfer-dialog.info", {
                      siteName: config.title
                    })}
                  </Alert>
                  <TextField
                    id={"total-amount"}
                    type={"number"}
                    disabled
                    fullWidth
                    value={(data?.stat[4] ?? 0) / 100}
                    label={t("invite.my-invite.invitation-card.transfer-dialog.total-amount", { context: "label" })}
                  />
                  <TextField
                    id={"transfer-amount"}
                    name={"transfer_amount"}
                    type={"number"}
                    value={values.transfer_amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={t("invite.my-invite.invitation-card.transfer-dialog.transfer-amount", { context: "label" })}
                    fullWidth
                    disabled={isSubmitting}
                    helperText={errors.transfer_amount && touched.transfer_amount ? errors.transfer_amount : undefined}
                    error={Boolean(touched.transfer_amount && errors.transfer_amount)}
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={setClose}>
                  {t("invite.my-invite.invitation-card.transfer-dialog.cancel-button")}
                </Button>
                <Button type={"submit"} variant={"contained"} disabled={isSubmitting}>
                  {t("invite.my-invite.invitation-card.transfer-dialog.confirm-button")}
                </Button>
              </DialogActions>
            </Box>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

const MyInvitationCard: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useGetInviteDataQuery();

  return (
    <MainCard title={t("invite.my-invite.invitation-card.title")}>
      <Stack spacing={2}>
        <Stack direction={"row"} spacing={2} alignItems={"flex-end"}>
          <Typography variant={"h2"} component={"span"}>
            {Number((data?.stat[4] ?? 0) / 100).toFixed(2)}
          </Typography>
          <Typography variant={"h6"} component={"span"} color={"textSecondary"}>
            {t("invite.my-invite.invitation-card.currency")}
          </Typography>
        </Stack>
        <Box>
          <Typography variant={"subtitle1"}>{t("invite.my-invite.invitation-card.description")}</Typography>
          <Typography variant={"body2"} color={"textSecondary"}>
            {t("invite.my-invite.invitation-card.helperText")}
          </Typography>
        </Box>
        <Stack direction={"row"} spacing={2}>
          <TransferButton />
          <Button variant={"outlined"}>{t("invite.my-invite.invitation-card.withdraw-button")}</Button>
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default MyInvitationCard;
