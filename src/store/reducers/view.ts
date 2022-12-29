import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeOptions } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

export interface ViewState {
  title: string | null;
  theme: {
    mode: PaletteMode | "system" | "time";
  };
}

const initialState: ViewState = {
  title: null,
  theme: {
    mode: (localStorage.getItem("theme_mode") as PaletteMode) || "system"
  }
};

const view = createSlice({
  name: "view",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<ViewState["title"]>) {
      state.title = action.payload;
    },
    setThemeMode(state, action: PayloadAction<ViewState["theme"]["mode"]>) {
      state.theme.mode = action.payload;
      localStorage.setItem("theme_mode", action.payload);
    }
  }
});

export const { setTitle, setThemeMode } = view.actions;
export default view.reducer;
