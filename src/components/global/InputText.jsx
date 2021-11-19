import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { onBlurHandler } from "../../app/form/onBlurHandler";
import { addErrors } from "../../app/store/errors";
import { addFormsValue } from "../../app/store/form";
import { Message } from "../../styles/form_page";
import { InputStyle } from "../../styles/global/Input";

export default function InputText({ readOnly = false, name }) {
  const { values, formsValue, validationErrors, validation } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      addFormsValue({ key: name, value: values[name]?.title || values[name] })
    );
  }, [dispatch, name, values]);

  const changeHandle = (e) => {
    dispatch(addFormsValue({ key: name, value: e.target.value }));
  };
  const runValidation = () => {
    if (!readOnly) {
      const target = {
        name,
        value: formsValue[name],
      };
      const response = onBlurHandler(target, validation)
      dispatch(addErrors({name, response}))
    }
  };
  return (
    <>
      <InputStyle
        value={formsValue[name]}
        onChange={changeHandle}
        readOnly={readOnly}
        onBlur={runValidation}
      />
      {validationErrors
        .filter((item) => item.field === name)
        .map((item, index) => (
          <Message key={index}>{item.message}</Message>
        ))}
    </>
  );
}
