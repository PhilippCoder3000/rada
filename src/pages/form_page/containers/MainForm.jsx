import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrors } from "../../../app/store/errors";
import {
  getDropDownValues,
  getValidationArray,
  updateMainForm,
} from "../../../app/api/api";
import { asyncSetSchema } from "../../../app/store/asyncAction/schema";
import { asyncSetValueForMainForm } from "../../../app/store/asyncAction/value";
import { setIsLoadingForm, setUserValueArray } from "../../../app/store/params";
import { setValidationArray } from "../../../app/store/validation";
import Loading from "../../../components/global/loading/Loading";
import Button from "../../../components/global/Button";
import InputText from "../../../components/global/InputText";
import { FormContainer, FormTitle } from "../../../styles/form_page";
import DropDown from "../../../components/global/dropdown/DropDown";

export default function MainForm() {
  const { stateParams, schema, formsValue } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  useEffect(() => {
    let params = {
      entity: stateParams.entity,
      categoryId: stateParams.categoryId,
      companyId: stateParams.companyId,
    };
    switch (stateParams.method) {
      case "view":
        dispatch(asyncSetValueForMainForm(params))
          .then(() => dispatch(asyncSetSchema(stateParams.categoryId)))
          .then(() => dispatch(setIsLoadingForm(false)));
        break;
      case "update":
        Promise.all([
          getDropDownValues("report-user"),
          getValidationArray(stateParams.entity),
        ])
          .then((array) => {
            dispatch(setUserValueArray(array[0]));
            dispatch(setValidationArray(array[1]));
          })
          .then(() => dispatch(asyncSetValueForMainForm(params)))
          .then(() => dispatch(asyncSetSchema(stateParams.categoryId)))
          .then(() => dispatch(setIsLoadingForm(false)));
        break;
      default:
        return <Loading />;
    }
  }, [
    dispatch,
    stateParams.method,
    stateParams.entity,
    stateParams.categoryId,
    stateParams.companyId,
  ]);

  if (stateParams.isLoadingForm) {
    return <Loading />;
  }
  const updateFormHandle = () => {
    const values = {...formsValue}
    delete values.company_name
    updateMainForm(
      stateParams.entity,
      stateParams.categoryId,
      stateParams.companyId,
      values
    ).then((response) => {
      if (response?.status === 422) {
        dispatch(setErrors(response.data));
      } else {
        // eslint-disable-next-line no-undef
        BX24.closeApplication()
      }
    });
  };

  switch (stateParams.method) {
    case "view":
      return (
        <FormContainer>
          {schema.map((item, index) => (
            <div key={index}>
              <FormTitle>{item.title}</FormTitle>
              <InputText
                readOnly={true}
                name={item.id}
              />
            </div>
          ))}
        </FormContainer>
      );
    case "update":
      return (
        <FormContainer>
          {schema.map((item, index) =>
            index === 0 ? (
              <div key={index}>
                <FormTitle key={item.id}>{item.title}</FormTitle>
                <InputText
                  key={`${item.id}${index}`}
                  readOnly={true}
                  name={item.id}
                />
              </div>
            ) : (
              <div key={index}>
                <FormTitle key={item.id}>{item.title}</FormTitle>
                <DropDown
                  key={`${item.id}${index}`}
                  items={stateParams.userValueArray}
                  width="100%"
                  name={item.id}
                />
              </div>
            )
          )}
          <Button format="submit-form" onClick={updateFormHandle}>
            Сохранить
          </Button>
        </FormContainer>
      );
    default:
      return <Loading />;
  }
}
