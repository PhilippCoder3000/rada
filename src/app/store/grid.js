import { createSlice } from "@reduxjs/toolkit";
import { asyncSetGrid, asyncSetSettingGrid } from "./asyncAction/grid";

const initialState = [];

const grid = createSlice({
  name: "grid",
  initialState,
  reducers: {
    toggleAllCheckbox: (state, action) =>
      state.map((item) => {
        return { ...item, checked: action.payload };
      }),
    toggleOneCheckbox: (state, action) =>
      state.map((item) => {
        if (item.checkedId === action.payload) {
          return { ...item, checked: !item.checked };
        }
        return item;
      }),
  },
  extraReducers: (builder) => {
    builder.addCase(asyncSetGrid.fulfilled, (state, action) => {
      return action.payload.map((item, index) => {
        return { ...item, checked: false, checkedId: index };
      });
    });
    builder.addCase(asyncSetSettingGrid.fulfilled, (state, action) =>
      action.payload.map((item, index) => {
        return { ...item, checked: false, checkedId: index };
      })
    );
  },
});

export const { setGrid, toggleAllCheckbox, toggleOneCheckbox } = grid.actions;
export default grid.reducer;
