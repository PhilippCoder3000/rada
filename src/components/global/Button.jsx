import React from "react";
import {
  BurgerButton,
  ByDefault,
  CancelModal,
  DashedBorderBtn,
  SubmitFormButton,
  SubmitModal,
} from "../../styles/global/Button";

export default function Button({ format, onClick, children, onMouseEnter }) {
  switch (format) {
    case "first-column-item":
      return (
        <BurgerButton onClick={onClick}>
          <span></span>
        </BurgerButton>
      );
    case "dashed-bottom-border":
      return <DashedBorderBtn onClick={onClick}>{children}</DashedBorderBtn>;
    case "submit-form":
      return <SubmitFormButton onClick={onClick} onMouseEnter={onMouseEnter}>{children}</SubmitFormButton>;
    case 'submit-customizing-modal':
      return <SubmitModal onClick={onClick}>{children}</SubmitModal>
    case 'cancel-customizing-modal':
      return <CancelModal onClick={onClick}>{children}</CancelModal>
    case 'by-default-customizing-modal':
      return <ByDefault onClick={onClick}>{children}</ByDefault>
    default:
      return <></>;
  }
}
