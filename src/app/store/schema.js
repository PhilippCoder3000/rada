import { createSlice } from "@reduxjs/toolkit";
import { asyncSetSchema, asyncSetSettingsSchema } from "./asyncAction/schema";

const initialState = [];

const schema = createSlice({
  name: "schema",
  initialState,
  reducers: {
    setSchemaWithChecked: (state, action) => action.payload,
    setNewOrders: (state, action) => {
      const start = action.payload.start;
      const end = action.payload.end;
      if (start > end) {
        state.map((item) => {
          let moveItemId;
          if (item.order === start) {
            moveItemId = item.id;
            item.order = end;
          }
          if (item.order >= end && item.order < start) {
            if (item.id !== moveItemId) {
              item.order += 1;
            }
          }
          return item;
        });
      } else {
        state.map((item) => {
          let moveItemId;
          if (item.order === start) {
            item.order = end;
            moveItemId = item.id;
          }
          if (item.order > start && item.order <= end) {
            if (item.id !== moveItemId) {
              item.order -= 1;
            }
          }
          return item;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncSetSchema.fulfilled, (state, action) => {
      return action.payload.map((item, index) => {
        return { ...item, order: index, checked: true };
      });
    });
    builder.addCase(asyncSetSettingsSchema.fulfilled, (state, action) =>
      action.payload.map((item, index) => {
        return { ...item, order: index, checked: true };
      })
    );
  },
});

export const { setSchema, setNewOrders, setSchemaWithChecked } = schema.actions;
export default schema.reducer;
