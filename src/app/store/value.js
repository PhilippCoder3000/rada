import { createSlice } from "@reduxjs/toolkit";
import { asyncSetValueForMainForm, asyncSetValueForSettingForm } from "./asyncAction/value";

const initialState = {
  name: "",
  company_id: "",
  report_id: "",
  user_id: "",
  category_id: "",
  editable: "",
  status: "",
};

const values = createSlice({
  name: "values",
  initialState,
  reducers: {
    setValues: (state, action) => {
      return { ...state, ...action.payload };
    },
    setValue: (state, action) => {
      return { ...state, [action.payload.name]: action.payload.value };
    },
    setCategoryID: (state, action) => {
      return { ...state, category_id: action.payload };
    },
    setReportId: (state, action) => {
      return { ...state, report_id: action.payload };
    },
    setUserID: (state, action) => {
      return { ...state, user_id: action.payload };
    },
    setCompanyId: (state, action) => {
      return { ...state, company_id: action.payload };
    },
    setCustomKeyId: (state, action) => {
      return{...state, [action.payload.key]: action.payload.value}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(asyncSetValueForMainForm.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
    builder.addCase(asyncSetValueForSettingForm.fulfilled, (state, action) => {
      return {...state, ...action.payload}
    })
  },
});

export const {
  setValues,
  setValue,
  setCategoryID,
  setReportId,
  setUserID,
  setCompanyId,
  setCustomKeyId,
} = values.actions;
export default values.reducer;
