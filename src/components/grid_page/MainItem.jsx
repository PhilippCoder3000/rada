import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleAllCheckbox } from "../../app/store/grid";
import CustomizingModal from "../../pages/grid_page/containers/CustomizingModal";
import { MainItemContainer } from "../../styles/grid_page";
import Checkbox from "../global/InputCheckbox";
import Modal from "../global/Modal";
import Gear from "./Gear";

export default function MainItem() {
  const dispatch = useDispatch();
  const {stateParams, settings} = useSelector(state => state)
  const [showModal, setShowModal] = useState(false);
  const [checkedMainItem, setCheckedMainItem] = useState(false);
  const setChanges = () => {
    setCheckedMainItem(!checkedMainItem);
    dispatch(toggleAllCheckbox(!checkedMainItem));
  };
  const showModalHandle = (e) => {
    setShowModal(!showModal);
  };
  useEffect(()=>{
    setCheckedMainItem(false)
  },[stateParams.currentTabId, settings.currentSettingsTab])
  return (
    <MainItemContainer>
      <Checkbox
        format="only-checkbox-input"
        checked={checkedMainItem}
        setChanges={setChanges}
      />
      <Gear onClick={showModalHandle} />
      <Modal show={showModal} closeModal={showModalHandle}>
        <CustomizingModal setShow={setShowModal} />
      </Modal>
    </MainItemContainer>
  );
}
