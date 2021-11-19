import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSchema, getSettingSchema } from "../../api/api";

export const asyncSetSchema = createAsyncThunk(
  "schema/setSchema",
  async (id) => {
    const response = await getSchema(id);
    return response;
  }
);

export const asyncSetSettingsSchema = createAsyncThunk(
  'settings/setSettingsSchema',
  async (tabName) => {
    const data = await getSettingSchema(tabName)
    return data
  }
)