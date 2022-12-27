import React, { useEffect } from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import { useDispatch } from "@/store";
import { setTitle } from "@/store/reducers/view";

// sections
import Search from "@/sections/knowledge/search";
import PostList from "@/sections/knowledge/postList";

const Knowledge: React.FC = () => {
  // set title
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle("knowledge"));
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Search />
      </Grid>
      <PostList />
    </Grid>
  );
};

export default Knowledge;
