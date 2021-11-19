import styled from "styled-components";
import svgSprite from "../../assets/svg/sprite-interface.min.svg";

export const BurgerButton = styled.button`
  width: 15px;
  height: 15px;
  display: flex;
  & span {
    margin: auto;
    position: relative;
    width: 15px;
    height: 2px;
    background: #eee;
    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: -4px;
      width: 15px;
      height: 2px;
      background: #eee;
    }
    &::after {
      top: 4px;
    }
  }
`;

export const DashedBorderBtn = styled.button`
  border-bottom: 1px dashed rgba(128, 134, 142, 0.35);
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

export const SubmitFormButton = styled.button`
  margin: 20px 0 0;
  padding: 7px 20px;
  background: #bbed21;
  color: #535c69;
  font-size: 18px;
  font-weight: 600;
  &:hover {
    background: #d2f95f;
  }
`;

export const SubmitModal = styled(SubmitFormButton)`
  margin: 0;
`;

export const CancelModal = styled.button`
  color: #535c69;
  font-size: 18px;
  font-weight: 600;
  &:hover {
    color: #000;
  }
`;

export const ByDefault = styled.button`
  position: relative;
  padding-left: 20px;
  opacity: 0.2;
  &:hover {
    opacity: 0.7;
  }
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    width: 20px;
    height: 20px;
    background: url(${svgSprite}) no-repeat 0 -35px;
  }
`;
