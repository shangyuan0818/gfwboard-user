import React, { useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useCounter } from "ahooks";

// material-ui
import { Stepper, Step, Typography, Link, StepLabel, StepContent, Stack, Button, Box } from "@mui/material";

// project imports
import MainCard from "@/components/MainCard";
import { useGetTelegramBotQuery, useGetUserConfigQuery, useGetUserSubscriptionQuery } from "@/store/services/api";

const TelegramCard: React.FC = () => {
  const { t } = useTranslation();
  const { data: telegramBotData } = useGetTelegramBotQuery();
  const { data: configData } = useGetUserConfigQuery();
  const { data: subscriptionData } = useGetUserSubscriptionQuery();

  const I18n = useMemo(() => Trans, [t]);

  const [activeStep, { inc: incActiveStep, dec: decActiveStep }] = useCounter(
    parseInt(localStorage.getItem("telegram_card_init") || "0") || 0,
    {
      min: 0,
      max: 2
    }
  );

  const ButtonGroup = useMemo(
    () => () =>
      (
        <Stack direction={"row"} spacing={1} mt={2}>
          <Button onClick={() => incActiveStep()} variant={"contained"} disabled={activeStep >= 2}>
            {t("profile.telegram-card.next_step")}
          </Button>
          <Button onClick={() => decActiveStep()} variant={"text"} disabled={activeStep <= 0}>
            {t("profile.telegram-card.previous_step")}
          </Button>
        </Stack>
      ),
    [t, activeStep]
  );

  return (
    <MainCard title={t("profile.telegram-card.title")}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>
            <Typography variant={"subtitle1"}>{t("profile.telegram-card.add_bot", { context: "label" })}</Typography>
          </StepLabel>
          <StepContent>
            <Box>
              <I18n
                i18nKey={"profile.telegram-card.add_bot"}
                tOptions={{ context: "content", name: telegramBotData?.username }}
              >
                <Link href={`https://t.me/${telegramBotData?.username}`} target={"_blank"} />
              </I18n>
            </Box>
            <ButtonGroup />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <Typography variant={"subtitle1"}>
              {t("profile.telegram-card.send_command", { context: "label" })}
            </Typography>
          </StepLabel>
          <StepContent>
            <Box>
              <I18n
                i18nKey={"profile.telegram-card.send_command"}
                tOptions={{
                  context: "content"
                }}
              >
                {{ command: `/bind ${subscriptionData?.subscribe_url}` }}
              </I18n>
            </Box>
            <ButtonGroup />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>{t("profile.telegram-card.add_to_group", { context: "label" })}</StepLabel>
          <StepContent>
            <Box>
              <Typography>
                <I18n
                  i18nKey={"profile.telegram-card.add_to_group"}
                  tOptions={{
                    link: configData?.telegram_discuss_link,
                    context: "content"
                  }}
                >
                  <Link href={configData?.telegram_discuss_link} target={"_blank"} rel={"noreferrer"} />
                </I18n>
              </Typography>
            </Box>
            <ButtonGroup />
          </StepContent>
        </Step>
      </Stepper>
    </MainCard>
  );
};

export default TelegramCard;
