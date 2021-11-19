import { createSlice } from "@reduxjs/toolkit";
import { asyncSetTabs } from "./asyncAction/params";

const initialState = {
  isLoadingTabs: true,
  isLoadingSchema: true,
  isLoadingGrid: true,
  isLoadingForm: true,
  isOpenSettings: false,
  formIsValid: true,
  forAllCheckbox: false,
  tabs: [],
  currentTabId: "",
  categoryValueArray: [],
  reportValueArray: [],
  userValueArray: [],
  companyValueArray: [],
  accessToken: "",
  isAdmin: true,
  readOnlyAllReportForm: true,
};

const stateParams = createSlice({
  name: "stateParams",
  initialState,
  reducers: {
    setStateParams: (state, action) => {
      return { ...initialState, ...action.payload };
    },
    setIsValidForm: (state, action) => {
      return { ...state, formIsValid: action.payload };
    },
    setForAllCheckbox: (state) => {
      return { ...state, forAllCheckbox: !state.forAllCheckbox };
    },
    setCurrentTabs: (state, action) => {
      return { ...state, currentTabId: action.payload };
    },
    setCategoryValueArray: (state, action) => {
      return { ...state, categoryValueArray: action.payload };
    },
    setReportValueArray: (state, action) => {
      return { ...state, reportValueArray: action.payload };
    },
    setUserValueArray: (state, action) => {
      return { ...state, userValueArray: action.payload };
    },
    setCompanyValueArray: (state, action) => {
      return { ...state, companyValueArray: action.payload };
    },
    setIsLoadingGrid: (state, action) => {
      return { ...state, isLoadingGrid: action.payload };
    },
    setIsLoadingSchema: (state, action) => {
      return { ...state, isLoadingSchema: action.payload };
    },
    setIsLoadingForm: (state, action) => {
      return { ...state, isLoadingForm: action.payload };
    },
    setIsOpenSettings: (state, action) => {
      return { ...state, isOpenSettings: action.payload };
    },
    setAccessToken: (state, action) => {
      return { ...state, accessToken: action.payload };
    },
    setIsAdmin: (state, action) => {
      return { ...state, isAdmin: action.payload };
    },
    setReadOnlyAllReportForm: (state, action) => {
      return { ...state, readOnlyAllReportForm: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncSetTabs.fulfilled, (state, action) => {
      if (action.payload.length === 0) {
        return state;
      }
      const lastId =
        action.payload.slice().sort((a, b) => b.id - a.id)[0].id + 1;
      return {
        ...state,
        tabs: action.payload
          .map((item) => {
            return { ...item, settings: false };
          })
          .concat({
            id: lastId,
            name: state.isAdmin ? "Настройки" : "",
            settings: true,
          }),
        currentTabId: state.currentTabId || action.payload[0].id,
        isLoadingTabs: false,
      };
    });
  },
});

export const {
  setStateParams,
  setIsValidForm,
  setGridNavItem,
  setForAllCheckbox,
  setCurrentTabs,
  setCategoryValueArray,
  setReportValueArray,
  setUserValueArray,
  setCompanyValueArray,
  setIsLoadingGrid,
  setIsLoadingSchema,
  setIsOpenSettings,
  setAccessToken,
  setIsLoadingForm,
  setIsAdmin,
  setReadOnlyAllReportForm,
} = stateParams.actions;
export default stateParams.reducer;
