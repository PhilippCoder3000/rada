import { configureStore } from "@reduxjs/toolkit";
import schemaReducer from "./schema";
import gridReducer from "./grid";
import stateParamsReducer from "./params";
import validationReducer from "./validation";
import valuesReducer from "./value";
import validationErrorsReducer from "./errors";
import settingsReducer from "./settings";
import formsValueReducer from "./form";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    schema: schemaReducer,
    grid: gridReducer,
    stateParams: stateParamsReducer,
    validation: validationReducer,
    validationErrors: validationErrorsReducer,
    values: valuesReducer,
    settings: settingsReducer,
    formsValue: formsValueReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
