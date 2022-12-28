import React, { useEffect } from "react";
import { useDispatch } from "@/store";
import { setTitle } from "@/store/reducers/view";
import useKnowledge from "@/hooks/useKnowledge";
import { Grid } from "@mui/material";
import PostCard from "@/sections/knowledge/postCard";

const KnowledgePost: React.FC = () => {
  const { data } = useKnowledge();

  // set title
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle(data?.title || "Loading..."));
  }, [dispatch, data]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <PostCard postId={data?.id || null} />
      </Grid>
    </Grid>
  );
};

export default KnowledgePost;
