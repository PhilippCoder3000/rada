import styled from "styled-components";

export const InputCheckbox = styled.input``;

export const CheckboxContainer = styled.div`
  position: relative;
  width: 230px;
  height: 30px;
  background: ${({ checked }) => (checked ? "#b3eafc" : "none")};
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background: #b3eafc;
  }
  & input {
    position: absolute;
    top: 8px;
    left: 5px;
  }
  & label {
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 5px 0 5px 25px;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

export const CheckboxContainerForAll = styled(CheckboxContainer)`
  width: 100px;
  opacity: 0.4;
  &:hover {
    opacity: 1;
    background: none;
  }
`;
export const InputStyle = styled.input`
  padding-left: 10px;
  width: 100%;
  height: ${({ readOnly }) => (readOnly ? "20px" : "40px")};
  border: ${({ readOnly }) =>
    readOnly ? "1px solid rgb(255, 255, 255)" : "1px solid rgb(204, 204, 204)"};
  outline: none;
`;

export const InputForAllReportFormStyle = styled.input`
  
`