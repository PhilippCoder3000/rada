import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDropDownValues } from "../../../app/api/api";
import { asyncSetSettingGrid } from "../../../app/store/asyncAction/grid";
import { asyncSetTabs } from "../../../app/store/asyncAction/params";
import { setUserValueArray } from "../../../app/store/params";
import Modal from "../../../components/global/Modal";
import ChangeFunctional from "../../../components/grid_page/ChangeFunctionalModal";
import ChangeResponsible from "../../../components/grid_page/ChangeResponsible";
import {
  HeaderControlBtnContainer,
  HeaderControlContainer,
} from "../../../styles/grid_page";
import { development } from "../../Router";

export default function HeaderControl() {
  const dispatch = useDispatch();
  const { stateParams, settings, grid } = useSelector((state) => state);
  const [showResponsibleModal, setShowResponsibleModal] = useState(false);
  const [showFunctionalModal, setShowFunctionalModal] = useState(false);
  const addNewDocument = () => {
    if (development) {
      window.open(
        `http://localhost:3000/id=0&method=create&page=setting-form&entity=${settings.currentSettingsTabName}`
      );
    } else {
      // eslint-disable-next-line no-undef
      BX24.openApplication(
        {
          bx24_width: 570,
          params: {
            id: 0,
            method: "create",
            page: "setting-form",
            entity: settings.currentSettingsTabName,
          },
        },
        () => {
          updateGrid();
        }
      );
    }
  };
  const updateGrid = () => {
    dispatch(asyncSetTabs());
    dispatch(asyncSetSettingGrid(settings.currentSettingsTabName));
  };
  const closeResponsibleModal = () => {
    setShowResponsibleModal(false);
  };
  const changeResponsible = () => {
    if (grid.filter((item) => item.checked).length === 0) {
      alert("Отметьте нужные элементы");
    } else {
      setShowResponsibleModal(true);
      getDropDownValues("report-user").then((data) =>
        dispatch(setUserValueArray(data))
      );
    }
  };
  const closeFunctionalModal = () => {
    setShowFunctionalModal(false);
  };
  const changeFunctional = () => {
    if (grid.filter((item) => item.checked).length === 0) {
      alert("Отметьте нужные элементы");
    } else {
      setShowFunctionalModal(true);
      getDropDownValues("report-user").then((data) =>
      dispatch(setUserValueArray(data))
    );
    }
  };
  return (
    <HeaderControlContainer>
      <h2>
        {
          stateParams.tabs.filter(
            (item) => item.id === stateParams.currentTabId
          )[0]?.name
        }
      </h2>
      <HeaderControlBtnContainer>
        {stateParams.isAdmin ? stateParams.isOpenSettings ? settings.currentSettingsTab !== 3 && (
          <button onClick={addNewDocument}>Добавить</button>
        ) : (
          <>
            <button onClick={changeFunctional}>Сменить функционал</button>
            <Modal closeModal={closeFunctionalModal} show={showFunctionalModal}>
              <ChangeFunctional
                show={showFunctionalModal}
                setShow={closeFunctionalModal}
              />
            </Modal>
            <button onClick={changeResponsible}>Сменить ответственного</button>
            <Modal
              closeModal={closeResponsibleModal}
              show={showResponsibleModal}
            >
              <ChangeResponsible
                show={showResponsibleModal}
                setShow={closeResponsibleModal}
              />
            </Modal>
          </>
        ): null}
      </HeaderControlBtnContainer>
    </HeaderControlContainer>
  );
}
