import { useMemo } from "react";

// third-party
import lo from "lodash-es";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

// project imports
import { useGetPlanQuery } from "@/store/services/api";

const usePlan = () => {
  const { i18n } = useTranslation();
  const params = useParams<{ id: string }>();
  const postId = useMemo(() => (!lo.isEmpty(params.id) && params.id ? parseInt(params.id) : null), [params.id]);
  return useGetPlanQuery(postId || 0, {
    skip: !postId
  });
};

export default usePlan;
