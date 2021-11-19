import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const formsValue = createSlice({
  name: "formsValue",
  initialState,
  reducers: {
    addFormsValue: (state, action) => {
      return { ...state, [action.payload.key]: action.payload.value };
    },
    addFormsValues: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addFormsValue, addFormsValues } = formsValue.actions;
export default formsValue.reducer;
