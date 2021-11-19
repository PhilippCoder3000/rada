import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewOrders } from "../../../app/store/schema";
import Loading from "../../../components/global/loading/Loading";
import SchemaItem from "../../../components/grid_page/SchemaItem";
import { SchemaContainer } from "../../../styles/grid_page";
import { asyncSetSchema } from "../../../app/store/asyncAction/schema";
import { asyncSetGrid } from "../../../app/store/asyncAction/grid";
import {
  setIsLoadingGrid,
  setIsLoadingSchema,
} from "../../../app/store/params";

export default function Schema() {
  const { schema, stateParams } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [start, setStart] = useState(-1);
  const dragStart = (e, order) => {
    setStart(order);
  };
  const dragEnter = (e, order) => {
    e.preventDefault();
    if (start !== order) {
      dispatch(setNewOrders({ start, end: order }));
      setStart(order);
    }
  };
  const drop = (e) => {
    e.preventDefault();
    setStart(-1);
  };

  useEffect(() => {
    if (!stateParams.isLoadingTabs && !stateParams.isOpenSettings) {
      dispatch(asyncSetSchema(stateParams.currentTabId)).then(() =>
        dispatch(setIsLoadingSchema(false))
      );
    }
  }, [
    dispatch,
    stateParams.currentTabId,
    stateParams.isLoadingTabs,
    stateParams.isOpenSettings,
  ]);

  useEffect(() => {
    if (!stateParams.isLoadingSchema && !stateParams.isOpenSettings) {
      dispatch(asyncSetGrid(stateParams.currentTabId)).then(() =>
        dispatch(setIsLoadingGrid(false))
      );
    }
  }, [
    dispatch,
    stateParams.currentTabId,
    stateParams.isLoadingSchema,
    stateParams.isOpenSettings,
  ]);

  if (stateParams.isLoadingGrid || stateParams.isLoadingSchema) {
    return <Loading />;
  }

  return (
    <SchemaContainer>
      {schema.map(
        ({ id, title, order, checked }, index) =>
          checked && (
            <SchemaItem
              key={index}
              title={title}
              position={order}
              bodyId={id}
              draggable={true}
              onDragStart={(e) => dragStart(e, order)}
              onDragEnter={(e) => dragEnter(e, order, index)}
              onDrop={drop}
              order={order}
            />
          )
      )}
    </SchemaContainer>
  );
}
