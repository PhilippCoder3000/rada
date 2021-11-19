import styled from "styled-components";

export const PopUpContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${({ show }) => (show ? "flex" : "none")};
  z-index: 100;
  & > div:first-of-type {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const ModalWindow = styled.div`
  position: relative;
  margin: 100px auto auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: #f9fafb;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  & > button {
    position: absolute;
    right: 20px;
    width: 15px;
    height: 15px;
    opacity: 0.5;
    transition: 0.2s;
    &:hover {
      opacity: 1;
    }
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 5px;
      left: -1px;
      width: 15px;
      height: 2px;
      background: #000000;
      border-radius: 5px;
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }
`;
