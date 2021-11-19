import { createSlice } from "@reduxjs/toolkit";

const initialState = [
];

const validation = createSlice({
  name: "validation",
  initialState,
  reducers: {
    setValidationArray: (state, action) => action.payload,
  },
});

export const { setValidationArray } = validation.actions;
export default validation.reducer;