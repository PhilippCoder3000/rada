import React from "react";
import { useSelector } from "react-redux";
import { MainPageContainer } from "../../styles/grid_page";
import FirstColumn from "./containers/FirstColumn";
import HeaderControl from "./containers/HeaderControl";
import HeaderNav from "./containers/HeaderNav";
import Schema from "./containers/Schema";
import SettingBar from "./containers/SettingBar";

export default function GridPage() {
  const { stateParams } = useSelector((state) => state);
  return (
    <>
      <HeaderNav />
      {!stateParams.isLoadingTabs && <HeaderControl />}
      {stateParams.isOpenSettings && <SettingBar />}
      <MainPageContainer>
        <FirstColumn />
        <Schema />
      </MainPageContainer>
    </>
  );
}
