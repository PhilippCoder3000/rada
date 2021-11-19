import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTabs } from "../../api/api";

export const asyncSetTabs = createAsyncThunk(
  "stateParams/setTabs",
  async () => {
    const response = await getTabs();
    return response;
  }
);
