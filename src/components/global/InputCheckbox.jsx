import React from "react";
import {
  CheckboxContainer,
  CheckboxContainerForAll,
  InputCheckbox,
} from "../../styles/global/Input";

export default function Checkbox({ format, checked, setChanges, label }) {
  const randomId = `item ${Math.round(Math.random() * 1000)}`;
  switch (format) {
    case "only-checkbox-input":
      return (
        <InputCheckbox
          type="checkbox"
          checked={checked}
          onChange={setChanges}
        />
      );
    case "customizing-grid":
      return (
        <CheckboxContainer checked={checked}>
          <InputCheckbox
            type="checkbox"
            checked={checked}
            onChange={setChanges}
            id={randomId}
          />
          <label htmlFor={randomId}>{label}</label>
        </CheckboxContainer>
      );
    case "customizing-for-all":
      return (
        <CheckboxContainerForAll checked={checked}>
          <InputCheckbox
            type="checkbox"
            checked={checked}
            onChange={setChanges}
            id={randomId}
          />
          <label htmlFor={randomId}>{label}</label>
        </CheckboxContainerForAll>
      );
    default:
      return <CheckboxContainer></CheckboxContainer>;
  }
}
