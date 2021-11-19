import React from "react";
import { ModalWindow, PopUpContainer } from "../../styles/global/Modal";

export default function Modal({ children, closeModal, show }) {
  return (
    <PopUpContainer show={show}>
      <div onClick={closeModal}></div>
      <ModalWindow>
        <button onClick={closeModal}></button>
        <div>{children}</div>
      </ModalWindow>
    </PopUpContainer>
  );
}
