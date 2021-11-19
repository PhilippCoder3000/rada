import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getDropDownValues,
  getReportValueArray,
  getTabs,
  getUserIdArrayForAllReport,
  setUserIdArrayForAllReport,
} from "../../../app/api/api";
import {
  setIsLoadingForm,
  setUserValueArray,
  setReadOnlyAllReportForm,
} from "../../../app/store/params";
import { setValue, setValues } from "../../../app/store/value";
import DropDown from "../../../components/global/dropdown/DropDown";
import Loading from "../../../components/global/loading/Loading";
import {
  FormContainer,
  FormLayout,
  FormTitle,
  MainFormTitle,
} from "../../../styles/form_page";
import Button from "../../../components/global/Button";

export default function AllReportForm() {
  const { stateParams, values, formsValue } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([
      getTabs(),
      getReportValueArray(),
      getDropDownValues("report-user"),
      getUserIdArrayForAllReport(stateParams.companyId),
    ])
      .then((array) => {
        dispatch(setValue({ name: "category", value: array[0] }));
        dispatch(setValue({ name: "reports", value: array[1] }));
        dispatch(setUserValueArray(array[2]));
        const newValues = {};
        array[3].forEach((item) => {
          newValues[`code_${item.report_id}`] = {
            link: item.user_id,
            title: array[2].filter((user) => user.id === item.user_id)[0].name,
          };
        });
        dispatch(setValues(newValues));
      })
      .then(() => dispatch(setIsLoadingForm(false)));
  }, [dispatch, stateParams.companyId]);

  if (stateParams.isLoadingForm) {
    return <Loading />;
  }

  const updateFormHandle = () => {
    setUserIdArrayForAllReport(stateParams.companyId, formsValue).then(
      (data) => data === true && dispatch(setReadOnlyAllReportForm(true))
    );
  };

  return (
    <FormContainer position="left">
      {stateParams.isAdmin && (
        <Button
          format="dashed-bottom-border"
          onClick={() => dispatch(setReadOnlyAllReportForm(false))}
        >
          Изменить
        </Button>
      )}
      {values.category.map((category, index) => (
        <FormLayout key={index}>
          <MainFormTitle>{category.name}</MainFormTitle>
          {values.reports
            .filter((item) => item.category_id === category.id)
            .map((item, index) => {
              return (
                <div key={index}>
                  <FormTitle>{item.name}</FormTitle>
                  <DropDown
                    items={stateParams.userValueArray}
                    width="100%"
                    name={`code_${item.id}`}
                    readOnly={stateParams.readOnlyAllReportForm}
                  />
                </div>
              );
            })}
        </FormLayout>
      ))}
      {!stateParams.readOnlyAllReportForm && (
        <Button format="submit-form" onClick={updateFormHandle}>
          Сохранить
        </Button>
      )}
    </FormContainer>
  );
}
