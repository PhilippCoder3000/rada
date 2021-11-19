import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteForm } from "../../app/api/api";
import {
  asyncSetGrid,
  asyncSetSettingGrid,
} from "../../app/store/asyncAction/grid";
import { asyncSetTabs } from "../../app/store/asyncAction/params";
import { development } from "../../pages/Router";
import { BurgerMenuContainer } from "../../styles/grid_page";

export default function BurgerMenu({ show, setShow, item }) {
  const dispatch = useDispatch();
  const { settings, stateParams } = useSelector((state) => state);
  // https://app-new.radamsk.ru/report-company-group/view?categoryId=1&companyId=1
  const click = (btn) => {
    setShow(false);
    if (settings.currentSettingsTabName) {
      if (development) {
        window.open(
          `http://localhost:3000/id=${item.id}&method=${btn.method}&page=setting-form&entity=${settings.currentSettingsTabName}`
        );
      } else {
        // eslint-disable-next-line no-undef
        BX24.openApplication(
          {
            bx24_width: 570,
            params: {
              id: item.id,
              method: btn.method,
              page: "setting-form",
              entity: settings.currentSettingsTabName,
            },
          },
          () => {
            updateGrid();
          }
        );
      }
    } else {
      if (development) {
        window.open(
          `http://localhost:3000/categoryId=${
            stateParams.currentTabId
          }&companyId=${item.company_name.id}&method=${
            btn.method
          }&page=main-form&entity=${
            settings.currentSettingsTabName || "report-company-group"
          }`
        );
      } else {
        // eslint-disable-next-line no-undef
        BX24.openApplication(
          {
            bx24_width: 570,
            params: {
              id: stateParams.currentTabId,
              companyId: item.company_name?.id,
              categoryId: stateParams.currentTabId,
              method: btn.method,
              page: "main-form",
              entity: settings.currentSettingsTabName || "report-company-group",
            },
          },
          () => {
            updateGrid();
          }
        );
      }
    }
  };

  const deleteRoom = () => {
    setShow(false);
    if (window.confirm("Подтвердите удаление")) {
      deleteForm(
        settings.currentSettingsTabName || "report-company-group",
        item.id || item.company_name.id
      ).then(() => updateGrid());
    }
  };

  const updateGrid = () => {
    dispatch(asyncSetTabs()).then(() => {
      if (settings.currentSettingsTabName) {
        dispatch(asyncSetSettingGrid(settings.currentSettingsTabName));
      } else {
        dispatch(asyncSetGrid(stateParams.currentTabId));
      }
    });
  };

  useEffect(() => {
    const listener = () => {
      if (show) {
        setShow(false);
      }
    };
    window.addEventListener("click", listener);
    return () => {
      window.removeEventListener("click", listener);
    };
  }, [setShow, show]);

  return (
    <BurgerMenuContainer show={show}>
      <button onClick={() => click(array[0], 0)}>{array[0].title}</button>
      {!stateParams.isAdmin ? null : item.editable === 0 ? null : (
        <>
          <button onClick={() => click(array[1], 1)}>{array[1].title}</button>
          {stateParams.tabs[0].id !== stateParams.currentTabId && (
            <button onClick={deleteRoom}>Удалить</button>
          )}
        </>
      )}
    </BurgerMenuContainer>
  );
}

const array = [
  { title: "Просмотреть", method: "view" },
  { title: "Редактировать", method: "update" },
];
