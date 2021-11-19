import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetGrid } from "../../../app/store/asyncAction/grid";
import { asyncSetTabs } from "../../../app/store/asyncAction/params";
import {
  setCurrentTabs,
  setIsLoadingGrid,
  setIsLoadingSchema,
  setIsOpenSettings,
} from "../../../app/store/params";
import { setCurrentSettingsTabName, setNewSettingsTab } from "../../../app/store/settings";
import Loading from "../../../components/global/loading/Loading";
import { HeaderNavBtn, HeaderNavContainer } from "../../../styles/grid_page";

export default function HeaderNav() {
  const dispatch = useDispatch();
  const { stateParams } = useSelector((state) => state);

  const setNewLink = (item) => {
    if (item.id === stateParams.currentTabId) {
      dispatch(asyncSetGrid(item.id))
    } else {
      dispatch(setIsLoadingSchema(true));
      dispatch(setIsLoadingGrid(true));
      dispatch(setCurrentTabs(item.id));
      dispatch(setIsOpenSettings(item.settings));
    }
    if(item.settings){
      dispatch(setCurrentSettingsTabName('report-category'))
    } else {
      dispatch(setNewSettingsTab(0))
      dispatch(setCurrentSettingsTabName(''))
    }
  };

  useEffect(() => {
    dispatch(asyncSetTabs());
  }, [dispatch]);

  if (stateParams.isLoadingTabs) {
    return <Loading />;
  }
  return (
    <HeaderNavContainer>
      {stateParams.tabs.map((item, index) => (
        <HeaderNavBtn
          borderBottom={stateParams.currentTabId === item.id}
          key={index}
          onClick={() => setNewLink(item)}
          disabled={stateParams.currentTabId === item.id}
        >
          {item.name}
        </HeaderNavBtn>
      ))}
    </HeaderNavContainer>
  );
}
