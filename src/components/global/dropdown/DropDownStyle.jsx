import styled from "styled-components";

export const DropDownContainer = styled.div`
  position: relative;
  width: ${({ width }) => width};
  height: 40px;
  cursor: pointer;
  & div {
    display: flex;
    p {
      margin: auto 10px;
    }
  }
`;

export const DropDownHeader = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  border: ${({readOnly})=> readOnly ? '1px solid #fff': '1px solid #ccc'} ;
  &::before, &::after {
    content: '';
    position: absolute;
    top: 45%;
    right: 15px;
    width: 6px;
    height: 2px;
    background: ${({readOnly})=> readOnly ? '#fff': '#000'};
    border-radius: 10px;
    transform: rotate(45deg);
  }
  &::after {
    right: 12px;
    transform: rotate(135deg);
  }
`;

export const DropDownBody = styled.div`
  position: absolute;
  top: ${({ show }) => (show ? "40px" : "80px")};
  width: 100%;
  max-height: 300px;
  flex-direction: column;
  transition: opacity 0.3s, top 0.3s;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  overflow-y: auto;
  transform: ${({ show }) => (show ? "scale(1)" : "scale(0)")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  & div {
    display: flex;
  }
`;

export const DropDownItem = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 40px;
  background: #fff;
  border: 1px solid #ffffff;
  border-top: 0;
  transition: 0.5s;
  &:hover {
    background: #eee;
  }
  & div {
    margin: auto 10px;
  }
`;
