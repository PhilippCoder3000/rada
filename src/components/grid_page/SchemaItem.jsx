import React from "react";
import { useSelector } from "react-redux";
import { development } from "../../pages/Router";
import {
  SchemaItemBody,
  SchemaItemContainer,
  SchemaItemHeader,
  SchemaItemParagraph,
} from "../../styles/grid_page";

export default function SchemaItem({ title, position, bodyId, ...props }) {
  const { grid } = useSelector((state) => state);

  return (
    <SchemaItemContainer draggable={true} position={position} {...props}>
      <SchemaItemHeader>
        <p>{title}</p>
      </SchemaItemHeader>
      <SchemaItemBody>
        {grid.map((item, index) => (
          <SchemaItemParagraph
            key={index}
            blue={item[bodyId]?.title === "Клиент"}
            empty={item[bodyId]?.title === "Не задано"}
          >
            {getCurrentCell(item[bodyId])}
          </SchemaItemParagraph>
        ))}
      </SchemaItemBody>
    </SchemaItemContainer>
  );
}
const getCurrentCell = (item) => {
  if (typeof item === "object") {
    switch (item.type) {
      case "openPath":
        return <button onClick={() => openPath(item)}>{item.title}</button>;
      case "openApplication":
        return (
          <button onClick={() => openApplication(item)}>{item.title}</button>
        );
      default:
        return <p>{item.title}</p>;
    }
  }
  return <p>{item}</p>;
};
const openPath = (item) => {
  if (development) {
    window.open(item.link);
  } else {
    // eslint-disable-next-line no-undef
    BX24.openPath(item.link, function (result) {});
  }
};

const openApplication = (item) => {
  if (development) {
    window.open(item.link);
  } else {
    // eslint-disable-next-line no-undef
    BX24.openApplication(item.link, function (result) {});
  }
};
