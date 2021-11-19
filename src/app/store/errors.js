import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const validationErrors = createSlice({
  name: "validationErrors",
  initialState,
  reducers: {
    setErrors: (state, action) => action.payload,
    addErrors: (state, action) => {
      return [
        ...state.filter((item) => item.field !== action.payload.name),
        ...action.payload.response,
      ];
    },
  },
});

export const { setErrors, addErrors } = validationErrors.actions;
export default validationErrors.reducer;
