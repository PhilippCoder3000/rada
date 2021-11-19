import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData, getSettingData } from "../../api/api";

export const asyncSetGrid = createAsyncThunk("grid/setGrid", async (id) => {
  const data = await getData(id);
  return data;
});

export const asyncSetSettingGrid = createAsyncThunk(
  "grid/setSettingGrid",
  async (tabName) => {
    const data = await getSettingData(tabName);
    return data;
  }
);
