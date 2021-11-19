import { createAsyncThunk } from "@reduxjs/toolkit";
import { getValueArrayForMainForm, getValueArrayForSettingForm } from "../../api/api";

export const asyncSetValueForMainForm = createAsyncThunk(
  "value/setValueForMainForm",
  async (params) => {
    const data = await getValueArrayForMainForm(params)
    return data
  }
)

export const asyncSetValueForSettingForm = createAsyncThunk(
  "value/setValueForSettingForm",
  async (params) => {
    const data = await getValueArrayForSettingForm(params)
    return data
  }
)