import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { asyncSetSettingGrid } from "../../../app/store/asyncAction/grid";
import { asyncSetSettingsSchema } from "../../../app/store/asyncAction/schema";
import {
  setIsLoadingGrid,
  setIsLoadingSchema,
} from "../../../app/store/params";
import { setNewSettingsTab } from "../../../app/store/settings";
import { SettingBarBtn, SettingBarContainer } from "../../../styles/grid_page";

export default function SettingBar() {
  const { settings, stateParams } = useSelector((state) => state);
  const dispatch = useDispatch();
  const changeTab = (item) => {
    if (item.id === settings.currentSettingsTab) {
      dispatch(setIsLoadingGrid(true))
      dispatch(asyncSetSettingGrid(settings.currentSettingsTabName)).then(() =>
        dispatch(setIsLoadingGrid(false))
      );
    } else {
      dispatch(setIsLoadingSchema(true));
      dispatch(setIsLoadingGrid(true));
      dispatch(setNewSettingsTab(item.id));
    }
  };
  useEffect(() => {
    dispatch(asyncSetSettingsSchema(settings.currentSettingsTabName)).then(() =>
      dispatch(setIsLoadingSchema(false))
    );
  }, [dispatch, settings.currentSettingsTabName]);
  useEffect(
    () => {
      dispatch(asyncSetSettingGrid(settings.currentSettingsTabName)).then(() =>
        dispatch(setIsLoadingGrid(false))
      );
    },
    [dispatch, settings.currentSettingsTabName],
    stateParams.tabs
  );
  return (
    <SettingBarContainer>
      {settings.settingsTabs.map((item, index) => (
        <SettingBarBtn
          key={index}
          borderBottom={index === settings.currentSettingsTab}
          onClick={() => changeTab(item)}
        >
          {item.title}
        </SettingBarBtn>
      ))}
    </SettingBarContainer>
  );
}
