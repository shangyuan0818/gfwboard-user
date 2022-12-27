import React, { useEffect, useState } from "react";
import useUrlState from "@ahooksjs/use-url-state";
import { useGetKnowledgeListQuery } from "@/store/services/api";
import { useTranslation } from "react-i18next";
import { Grid, List, ListItem, ListItemButton, Typography } from "@mui/material";
import MainCard from "@/components/MainCard";
import dayjs from "dayjs";
import { makeStyles } from "@/themes/hooks";
import { useSafeState } from "ahooks";

const useStyles = makeStyles()((theme) => ({
  root: {},
  listItemButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: theme.spacing(1, 2.5)
  }
}));

const PostList: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [state] = useUrlState<{ s: string }>({ s: "" });
  const [search, setSearch] = useSafeState(state.s);
  const [flag, setFlag] = useSafeState<NodeJS.Timer | null>(null);

  useEffect(() => {
    // 延迟 500 毫秒后再更新搜索关键词，防止频繁更新
    if (flag !== null) {
      clearTimeout(flag);
    }

    setFlag(
      setTimeout(() => {
        setSearch(state.s);
      }, 500)
    );
  }, [state.s]);

  const { data } = useGetKnowledgeListQuery({
    keyword: search,
    language: i18n.language
  });

  const { classes } = useStyles();

  return (
    <>
      {Object.keys(data || {}).map((key) => (
        <Grid item xs={12} key={key}>
          <MainCard title={t(key, { ns: "knowledge" })} content={false}>
            <List sx={{ p: 0 }}>
              {(data || {})[key].map((post) => (
                <ListItem disablePadding divider key={post.id}>
                  <ListItemButton className={classes.listItemButton}>
                    <Typography variant={"body1"} fontWeight={400} noWrap mb={0.5}>
                      {post.title}
                    </Typography>
                    <Typography variant={"caption"} noWrap>
                      {t("knowledge.post.update", { date: dayjs.unix(post.updated_at).format("YYYY/MM/DD") })}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </MainCard>
        </Grid>
      ))}
    </>
  );
};

export default PostList;
