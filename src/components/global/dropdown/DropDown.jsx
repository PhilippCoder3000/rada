import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setErrors } from "../../../app/store/errors";
// import { setErrors } from "../../../app/store/errors";
import { addFormsValue } from "../../../app/store/form";
import { Message } from "../../../styles/form_page";
import {
  DropDownBody,
  DropDownContainer,
  DropDownHeader,
  DropDownItem,
} from "./DropDownStyle";

export default function DropDown({
  items,
  width,
  name,
  newName,
  readOnly = false,
}) {
  const { values, formsValue, validationErrors } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addFormsValue({ key: newName || name, value: values[name] }));
  }, [dispatch, name, newName, values]);
  const clickOnOption = (item) => {
    const newItem = {
      title: item.name,
      link: item.id,
    };
    dispatch(addFormsValue({ key: newName || name, value: newItem }));
    if(name === 'userId'){
      dispatch(setErrors(validationErrors.filter((item) => item.field !== 'id')));
    } else {
      dispatch(setErrors(validationErrors.filter((item) => item.field !== name)));
    }
    
  };
  const [show, setShow] = useState(false);
  const clickShowHandle = () => {
    if (!readOnly) {
      setShow(!show);
    }
  };
  return (
    <>
      <DropDownContainer key={name} width={width} onClick={clickShowHandle}>
        <DropDownHeader readOnly={readOnly}>
          <p>{formsValue[newName || name]?.title}</p>
        </DropDownHeader>
        <DropDownBody show={show}>
          {items.map((item, index) => (
            <DropDownItem
              key={index}
              index={index}
              onClick={() => clickOnOption(item)}
            >
              <div>{item.name}</div>
            </DropDownItem>
          ))}
        </DropDownBody>
      </DropDownContainer>
      {validationErrors
        .filter((item) => item.field === name)
        .map((item, index) => (
          <Message key={index}>{item.message}</Message>
        ))}
      {name === 'userId' && validationErrors
        .filter((item) => item.field === 'id')
        .map((item, index) => (
          <Message key={index}>{item.message}</Message>
        ))}
    </>
  );
}
