// third-party
import { combineReducers } from "@reduxjs/toolkit";

// project import
import menu from "./menu";
import snackbar from "./snackbar";
import auth from "./auth";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = {
  menu,
  snackbar,
  auth
};

export default reducers;
