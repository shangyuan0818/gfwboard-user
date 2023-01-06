import React, { useEffect, useState } from "react";
import MainCard from "@/components/MainCard";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Tooltip,
  Typography
} from "@mui/material";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useCheckCouponMutation } from "@/store/services/api";
import { usePlanDetailContext } from "@/sections/subscription/planDetailsPage/context";
import { Formik } from "formik";

const CouponCard: React.FC = () => {
  const { t } = useTranslation();
  const [checkCoupon, { isLoading }] = useCheckCouponMutation();
  const { setIsSubmitting, isSubmitting, id, setCouponCode, couponCode } = usePlanDetailContext();

  useEffect(() => {
    setIsSubmitting(isLoading);
  }, [isLoading, setIsSubmitting]);

  return (
    <MainCard title={t("subscription.plan.coupon-card.title")}>
      <Formik
        initialValues={{
          coupon: couponCode?.code || ""
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors, setValues }) => {
          if (couponCode) {
            setValues({ coupon: "" });
            setCouponCode(null);
            return;
          }

          setSubmitting(true);
          await checkCoupon({ code: values.coupon, plan_id: id })
            .unwrap()
            .then((res) => {
              setCouponCode(res);
              setSubmitting(false);
              setStatus({ success: true });
            })
            .catch((err) => {
              setSubmitting(false);
              setStatus({ success: false });
              setErrors(err.errors || { coupon: err.message });
            });
        }}
      >
        {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => (
          <Box component={"form"} onSubmit={handleSubmit}>
            <OutlinedInput
              fullWidth
              name={"coupon"}
              placeholder={t("subscription.plan.coupon-card.placeholder").toString()}
              disabled={isSubmitting || couponCode !== null}
              onChange={handleChange}
              onBlur={handleBlur}
              value={couponCode !== null ? couponCode.code : values.coupon}
              endAdornment={
                <InputAdornment position={"end"}>
                  <Tooltip
                    title={t("subscription.plan.coupon-card.tooltip", {
                      context: couponCode !== null ? "reset" : "add"
                    }).toString()}
                    placement={"bottom"}
                  >
                    <IconButton edge={"end"} type={"submit"}>
                      {couponCode !== null ? <CloseCircleOutlined /> : <CheckCircleOutlined />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              }
            />
            {touched.coupon && errors.coupon && <FormHelperText error>{errors.coupon}</FormHelperText>}
          </Box>
        )}
      </Formik>
    </MainCard>
  );
};

export default CouponCard;
