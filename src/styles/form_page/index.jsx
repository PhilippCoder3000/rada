import styled from "styled-components";

export const FormContainer = styled.div`
  margin: 0 auto;
  margin-left: ${({position}) => position === 'left'? '0':'auto' };
  padding: 15px;
  width: 540px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #f9fafb;
  & > span {
    margin: 15px 0px 5px;
    width: 100%;
    height: 1px;
    background: #eee;
  }
  & > div {
    width: 100%;
  }
  & > button:first-of-type {
    margin-left: auto;
    margin-right: 10px;
    margin-bottom: 10px;
  }
`;

export const FormTitle = styled.h3`
  margin: 10px 0;
  color: rgb(163, 169, 177);
  font-size: 12px;
  font-weight: 600;
`

export const MainFormTitle = styled(FormTitle)`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
`

export const FormLayout = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #eee;
`

export const Message = styled.h6`
  margin: 5px 0;
  padding: 10px;
  width: 100%;
  display: flex;
  background: #fae5e8;
  color: #d0011b;
  font-weight: 400;
`;

export const InputContainer = styled.div`
  width: 100%;
  height: 40px;
  display: ${({ hidden }) => (hidden ? "none" : "block")};
  border: ${({readOnly})=> readOnly ? '1px solid #fff' : '1px solid #ccc'} ;
  & > input {
    padding-left: ${({readOnly})=> readOnly ? '5px' : '20px'};
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
`;

export const CheckboxContainer = styled(InputContainer)`
  height: auto;
  border: none;
  & > div {
    padding: 0 5px;
    & input {
      margin-right: 10px;
    }
    & label {
    }
  }
`;

export const CompleteModalContainer = styled.div`
  width: 400px;
`