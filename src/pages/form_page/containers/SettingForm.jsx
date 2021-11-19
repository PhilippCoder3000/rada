import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  createForm,
  createNewUser,
  getUserIdArray,
  getValidationArray,
  updateForm,
} from "../../../app/api/api";
import { asyncSetTabs } from "../../../app/store/asyncAction/params";
import { asyncSetSettingsSchema } from "../../../app/store/asyncAction/schema";
import { asyncSetValueForSettingForm } from "../../../app/store/asyncAction/value";
import { setErrors } from "../../../app/store/errors";
import { setIsLoadingForm } from "../../../app/store/params";
import { setValidationArray } from "../../../app/store/validation";
import { setValue } from "../../../app/store/value";
import Button from "../../../components/global/Button";
import DropDown from "../../../components/global/dropdown/DropDown";
import InputText from "../../../components/global/InputText";
import Loading from "../../../components/global/loading/Loading";
import { FormContainer, FormTitle } from "../../../styles/form_page";

export default function SettingForm() {
  const { stateParams, schema, settings, formsValue, values } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const params = {
      entity: stateParams.entity,
      id: stateParams.id,
    };
    switch (stateParams.method) {
      case "create":
        if (stateParams.entity === "report-user") {
          getUserIdArray()
            .then((data) =>
              data.map((item) => {
                return { ...item, title: item.name };
              })
            )
            .then((data) =>
              dispatch(setValue({ name: "userId", value: data }))
            );
        }
        Promise.all([
          getValidationArray(params.entity),
          dispatch(asyncSetSettingsSchema(stateParams.entity)),
        ])
          .then((array) => dispatch(setValidationArray(array[0])))
          .then(() => dispatch(setIsLoadingForm(false)));
        break;
      case "view":
        dispatch(asyncSetSettingsSchema(stateParams.entity))
          .then(() => dispatch(asyncSetTabs()))
          .then(() => dispatch(asyncSetValueForSettingForm(params)))
          .then(() => dispatch(setIsLoadingForm(false)));
        break;
      case "update":
        dispatch(asyncSetSettingsSchema(stateParams.entity))
          .then(() => dispatch(asyncSetValueForSettingForm(params)))
          .then(() => dispatch(setIsLoadingForm(false)));
        break;
      default:
        return <Loading />;
    }
  }, [dispatch, stateParams.method, stateParams.entity, stateParams.id]);

  useEffect(() => {}, []);

  if (stateParams.isLoadingForm) {
    return <Loading />;
  }

  const submitFormHandle = () => {
    if (stateParams.method === "update") {
      updateForm(
        stateParams.entity,
        stateParams.id,
        stateParams.categoryId,
        stateParams.companyID,
        formsValue
      ).then((response) => {
        if (response.status === 422) {
          console.log(response);
          dispatch(setErrors(response.data));
        } else {
          // eslint-disable-next-line no-undef
          BX24.closeApplication();
        }
      });
    }
    if (stateParams.method === "create") {
      if (stateParams.entity === "report-user") {
        createNewUser(formsValue).then((response) => {
          if (response.status === 422) {
            dispatch(setErrors(response.data));
          } else {
            // eslint-disable-next-line no-undef
            BX24.closeApplication();
          }
        });
      } else {
        createForm(stateParams.entity, formsValue).then((response) => {
          if (response.status === 422) {
            dispatch(setErrors(response.data));
          } else {
            // eslint-disable-next-line no-undef
            BX24.closeApplication();
          }
        });
      }
    }
  };

  switch (stateParams.method) {
    case "create":
      return (
        <FormContainer>
          {stateParams.entity === "report-user" &&
          typeof values.userId !== "undefined" ? (
            <div key="first key">
              <FormTitle>{schema[0].title}</FormTitle>
              <DropDown
                items={values.userId}
                width="100%"
                name="userId"
                newName="id"
              />
            </div>
          ) : null}
          {schema.map(
            (item, index) =>
              index !== 0 && (
                <div key={index}>
                  <FormTitle key={item.id}>{item.title}</FormTitle>
                  <InputText key={item.id} readOnly={false} name={item.id} />
                </div>
              )
          )}
          <Button format="submit-form" onClick={submitFormHandle}>
            Сохранить
          </Button>
        </FormContainer>
      );
    case "view":
      return (
        <FormContainer>
          <>
            <h3>{settings.currentEntity.title}</h3>
            <span></span>
          </>
          {schema.map((item, index) => (
            <div key={index}>
              <FormTitle>{item.title}</FormTitle>
              <InputText readOnly={true} name={item.id} />
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
                <FormTitle>{item.title}</FormTitle>
                <InputText readOnly={true} name={item.id} />
              </div>
            ) : (
              <div key={index}>
                <FormTitle>{item.title}</FormTitle>
                <InputText readOnly={false} name={item.id} />
              </div>
            )
          )}
          <Button format="submit-form" onClick={submitFormHandle}>
            Сохранить
          </Button>
        </FormContainer>
      );
    default:
      return <Loading />;
  }
}
