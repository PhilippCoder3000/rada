import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onBlurHandler } from "../../app/form/onBlurHandler";
import { addErrors } from "../../app/store/errors";
import { setValue } from "../../app/store/value";
import { InputContainer, Message } from "../../styles/form_page";

export const InputText = forwardRef(({ name, readOnly, inTitle }, ref) => {
  const { values, validation, validationErrors } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const proxyHandler = () => {
    if (!readOnly) {
      const target = {
        name,
        value: typeof values[name] === "undefined" ? "" : values[name],
      };
      const response = onBlurHandler(target, validation);
      dispatch(addErrors({name, response}));
    }
  };
  const changeHandler = (e) => {
    dispatch(setValue({ name, value: e.target.value }));
  };
  return (
    <>
      <InputContainer readOnly={readOnly}>
        <input
          type="text"
          name={name}
          readOnly={readOnly}
          onBlur={proxyHandler}
          value={inTitle? values[name] ? values[name].title : ''  :values[name]}
          onChange={changeHandler}
          ref={ref}
        />
      </InputContainer>
      {validationErrors
        .filter((item) => item.field === name)
        .map((item, index) => (
          <Message
            key={index}
            invalid={
              validationErrors.filter((item) => item.field === name).length > 0
            }
          >
            {item.message}
          </Message>
        ))}
    </>
  );
});
