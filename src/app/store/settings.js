import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settingsTabs: [
    { id: 0, name: "report-category", title: "Категории" },
    { id: 1, name: "report", title: "Отчеты" },
    { id: 2, name: "report-user", title: "Пользователи" },
    { id: 3, name: "company", title: "Компании" },
  ],
  currentSettingsTab: 0,
  currentSettingsTabName: "",
  currentEntity: {},
};

const settings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setNewSettingsTab: (state, action) => {
      return {
        ...state,
        currentSettingsTab: action.payload,
        currentSettingsTabName: state.settingsTabs[action.payload].name,
      };
    },
    setCurrentEntity: (state, action) => {
      return {
        ...state,
        currentEntity: state.settingsTabs[state.currentSettingsTab],
      };
    },
    setEntity: (state, action) => {
      return {...state, currentEntity: action.payload}
    },
    setCurrentSettingsTabName: (state, action) => {
      return {
        ...state,
        currentSettingsTabName: action.payload
      }
    }
  },
});

export const { setNewSettingsTab, setCurrentEntity, setCurrentSettingsTabName, setEntity } = settings.actions;
export default settings.reducer;
