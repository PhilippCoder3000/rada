import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setNewResponsible } from "../../app/api/api";
import { asyncSetGrid } from "../../app/store/asyncAction/grid";
import { ChangeResponsibleContainer } from "../../styles/grid_page/ChangeResponsibleStyle";
import Button from "../global/Button";
import DropDown from "../global/dropdown/DropDown";
import Loading from "../global/loading/Loading";

export default function ChangeResponsible({ show, setShow }) {
  const { stateParams, grid, formsValue } = useSelector((state) => state);
  const dispatch = useDispatch();
  const newName = "old_user_id";
  const newName2 = "old_user_id_2";

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
    } else {
      const companyId = grid
        .filter((item) => item.checked)
        .map((item) => item.company_name.id);
      const params = {
        companyIds: companyId,
        categoryId: stateParams.currentTabId,
        oldResponsible: formsValue[newName].link,
        newResponsible: formsValue[newName2].link,
      };
      setNewResponsible(params).then(() =>
        dispatch(asyncSetGrid(stateParams.currentTabId))
      ).then(() => setShow(false));
    }
  };
  return (
    <ChangeResponsibleContainer>
      <h3>Текущий ответственный</h3>
      <DropDown
        items={stateParams.userValueArray}
        width="100%"
        name="user_id"
        newName={newName}
      />
      <h3>Новый ответственный</h3>
      <DropDown
        items={stateParams.userValueArray}
        width="100%"
        name="user_id"
        newName={newName2}
      />
      <Button format="submit-form" onClick={submitForm}>
        Применить
      </Button>
    </ChangeResponsibleContainer>
  );
}
