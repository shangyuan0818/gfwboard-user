import React from "react";
import MainCard from "@/components/MainCard";
import { useTranslation } from "react-i18next";
import { useGetPlanQuery } from "@/store/services/api";
import MuiMarkdown from "mui-markdown";
import { Box, Skeleton, Stack, Typography } from "@mui/material";

export interface PlanInfoCardProps {
  id: number;
}

const PlanInfoCard: React.FC<PlanInfoCardProps> = ({ id }) => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetPlanQuery(id, {
    skip: id === 0
  });

  return (
    <MainCard
      title={t("subscription.plan-info-card.title", {
        name: data?.name
      })}
      content={false}
    >
      {data && (
        <Typography variant={"body1"} paragraph>
          <MuiMarkdown>{data?.content}</MuiMarkdown>
        </Typography>
      )}
      {isLoading && (
        <Stack p={2} spacing={1}>
          {new Array(3).map((_, index) => (
            <Skeleton key={index} variant={"text"} width={"100%"} height={20} />
          ))}
        </Stack>
      )}
    </MainCard>
  );
};

export default PlanInfoCard;
