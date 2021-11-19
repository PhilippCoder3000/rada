import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getReportValueArray, setNewFunctional } from "../../app/api/api";
import { asyncSetGrid } from "../../app/store/asyncAction/grid";
import { setReportValueArray } from "../../app/store/params";
import { ChangeFunctionalContainer } from "../../styles/grid_page/ChangeResponsibleStyle";
import Button from "../global/Button";
import DropDown from "../global/dropdown/DropDown";
import Loading from "../global/loading/Loading";

export default function ChangeFunctional({ show, setShow }) {
  const { stateParams, grid, formsValue } = useSelector((state) => state);
  const dispatch = useDispatch();
  const newName = "old_user_id";
  const newName2 = "old_user_id_2";
  const newName3 = "old_user_id_3";
  useEffect(() => {
    if (show) {
      getReportValueArray().then((data) => dispatch(setReportValueArray(data)));
    }
  }, [dispatch, show]);

  if (!show) {
    return null;
  }

  if (stateParams.userValueArray.length === 0) {
    return <Loading />;
  }
  const submitForm = () => {
    if (formsValue[newName] === "") {
      alert("Необходимо выбрать текущего ответственного");
    } else if (formsValue[newName2] === "") {
      alert("Необходимо выбрать нового ответственного");
    } else if (formsValue[newName3] === "") {
      alert("Необходимо выбрать отчет");
    } else {
      const companyId = grid
        .filter((item) => item.checked)
        .map((item) => item.company_name.id);
      const params = {
        companyIds: companyId,
        categoryId: stateParams.currentTabId,
        reportId: formsValue[newName3].link,
        oldResponsible: formsValue[newName].link,
        newResponsible: formsValue[newName2].link,
      };
      setNewFunctional(params)
        .then(() => dispatch(asyncSetGrid(stateParams.currentTabId)))
        .then(() => setShow(false));
    }
  };
  return (
    <ChangeFunctionalContainer>
      <h3>Текущий пользователь</h3>
      <DropDown
        items={stateParams.userValueArray}
        width="100%"
        name="user_id"
        newName={newName}
      />
      <h3>Новый пользователь</h3>
      <DropDown
        items={stateParams.userValueArray}
        width="100%"
        name="user_id"
        newName={newName2}
      />
      <h3>Отчет</h3>
      <DropDown
        items={stateParams.reportValueArray}
        width="100%"
        name="report_id"
        newName={newName3}
      />
      <Button format="submit-form" onClick={submitForm}>
        Применить
      </Button>
    </ChangeFunctionalContainer>
  );
}
