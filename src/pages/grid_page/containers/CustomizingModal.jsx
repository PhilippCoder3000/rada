import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CustomizingModalFooter,
  CustomizingModalSchemasItems,
  CustomizingModalTitle,
  CustomizingModalTopBtn,
} from "../../../styles/grid_page";
import Button from "../../../components/global/Button";
import Checkbox from "../../../components/global/InputCheckbox";
import { setSchemaWithChecked } from "../../../app/store/schema";
import { useDispatch } from "react-redux";
import { setForAllCheckbox } from "../../../app/store/params";

export default function CustomizingModal({ setShow }) {
  const dispatch = useDispatch();
  const { schema, stateParams } = useSelector((state) => state);
  const [proxySchema, setProxySchema] = useState(schema);
  const changeHandler = (id) => {
    setProxySchema(
      proxySchema.slice().map((item) => {
        if (item.id === id) {
          return { ...item, checked: !item.checked, order: proxySchema.length };
        }
        return item;
      })
    );
  };
  useEffect(()=>{
    setProxySchema(schema)
  },[schema])
  const submitNewChecked = () => {
    const unCheckedElements = proxySchema
      .slice()
      .filter((item) => !item.checked);
    const sortedProxySchema = proxySchema
      .slice()
      .filter((item) => item.checked)
      .sort((a, b) => a.order - b.order)
      .concat(unCheckedElements)
      .map((item, index) => {
        return { ...item, order: index };
      });
    dispatch(setSchemaWithChecked(sortedProxySchema));
    setShow(false);
  };
  const changeForAllCheckbox = () => {
    dispatch(setForAllCheckbox());
  };
  const checkAll = () => {
    setProxySchema(proxySchema.slice().map(item => {
      return {...item, checked: true}
    }))
  }
  const unCheckAll = () => {
    setProxySchema(proxySchema.slice().map(item => {
      return {...item, checked: false}
    }))
  }
  return (
    <>
      <CustomizingModalTitle>
        Настройка списка «Мои задачи»
      </CustomizingModalTitle>
      <CustomizingModalTopBtn>
        <Button format="dashed-bottom-border" onClick={checkAll}>Выбрать все</Button>
        <Button format="dashed-bottom-border" onClick={unCheckAll}>Отменить все</Button>
      </CustomizingModalTopBtn>
      <CustomizingModalSchemasItems>
        {proxySchema.map((item, index) => (
          <Checkbox
            key={index}
            format="customizing-grid"
            label={item.title}
            checked={item.checked}
            setChanges={() => changeHandler(item.id)}
          />
        ))}
      </CustomizingModalSchemasItems>
      <CustomizingModalFooter>
        <Button format="by-default-customizing-modal">По умолчанию</Button>
        <Checkbox
          format="customizing-for-all"
          label="Для всех"
          checked={stateParams.forAllCheckbox}
          setChanges={changeForAllCheckbox}
        />
        <Button format="submit-customizing-modal" onClick={submitNewChecked}>
          Применить
        </Button>
        <Button
          format="cancel-customizing-modal"
          onClick={() => setShow(false)}
        >
          Отменить
        </Button>
      </CustomizingModalFooter>
    </>
  );
}
