import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ViewState {
  title: string | null;
}

const initialState: ViewState = {
  title: null
};

const view = createSlice({
  name: "view",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<ViewState["title"]>) {
      state.title = action.payload;
    }
  }
});

export const { setTitle } = view.actions;
export default view.reducer;
