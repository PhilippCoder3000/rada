import styled from "styled-components";
import gear from "../../assets/svg/grid-gear.svg";

export const HeaderNavContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  background: #eef2f4;
  & > button:last-of-type {
    margin-left: auto;
  }
`;

export const HeaderNavBtn = styled.button`
  margin: 0 20px;
  border-bottom: ${({ borderBottom }) =>
    borderBottom ? "3px solid #1058d0" : "3px solid rgba(255, 255, 255, 0)"};
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s;
  &:hover {
    color: #1058d0;
  }
`;

export const HeaderControlContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  background: #eef2f4;
  & h2 {
    margin-left: 20px;
    font-size: 26px;
    font-weight: 300;
  }
`;

export const HeaderControlBtnContainer = styled.div`
  margin-left: auto;
  & > button {
    margin-right: 20px;
    height: 40px;
    padding: 0 15px;
    background: #3bc8f5;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    &:hover {
      background: #3eddff;
    }
  }
`;

export const SettingBarContainer = styled.div`
  display: flex;
  background: #eef2f4;
  border-bottom: 1px solid #ccc;
`;

export const SettingBarBtn = styled.button`
  margin: 0 20px 10px;
  border-bottom: ${({ borderBottom }) =>
    borderBottom ? "2px solid #1058d0" : "2px solid rgba(255, 255, 255, 0)"};
`;

export const MainPageContainer = styled.main`
  height: calc(100vh - 240px);
  display: flex;
  overflow: auto;
  background: #f9fafb;
`;

export const SchemaContainer = styled.div`
  position: relative;
  display: flex;
`;

export const SchemaItemContainer = styled.div`
  width: 200px;
  position: absolute;
  cursor: pointer;
  transition: 0.1s;
  transform: translateX(${({ position }) => position * 200}px);
`;

export const SchemaItemHeader = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  border-bottom: 1px solid #eee;
  & p {
    margin: auto 5px auto 5px;
    font-weight: 600;
  }
`;

export const SchemaItemBody = styled.div`
  & div {
    min-height: 35px;
    display: flex;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    & * {
      margin: auto 10px;
      white-space: nowrap;
    }
  }
`;

export const SchemaItemParagraph = styled.div`
  background: ${({blue, empty}) => blue ? '#a6c9ff': empty ? '#e4e6e9' : 'none'};
`

export const FirstColumnContainer = styled.div`
  width: 70px;
  display: flex;
  flex-direction: column;
`;

export const MainItemContainer = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eee;
  & input {
    margin-right: 10px;
  }
`;

export const GearStyle = styled.button`
  width: 15px;
  height: 15px;
  background: url(${gear}) no-repeat 50% 50%/100%;
  border: none;
  opacity: 0.5;
  transition: 0.3s;
  &:hover {
    opacity: 1;
  }
`;

export const RowItemContainer = styled(MainItemContainer)`
  position: relative;
  min-height: 35px;
`;

export const CustomizingModalTitle = styled.h2`
  margin-bottom: 20px;
  color: #80868e;
  font-size: 14px;
`;
export const CustomizingModalTopBtn = styled.div`
  margin-bottom: 20px;
  & button:first-of-type {
    margin-right: 20px;
  }
`;
export const CustomizingModalSchemasItems = styled.div`
  width: 1000px;
  height: 250px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;
export const CustomizingModalFooter = styled.div`
  display: flex;
  align-items: center;
  & button:nth-of-type(1) {
    margin-right: 10px;
  }
  & button:nth-of-type(2) {
    margin-left: 120px;
    margin-right: 15px;
  }
`;

export const BurgerMenuContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 110%;
  width: 220px;
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    top: 10px;
    left: -10px;
    width: 20px;
    height: 20px;
    background: #fff;
    transform: rotate(45deg);
    box-shadow: -3px 3px 4px rgba(0, 0, 0, 0.1);
  }
  & button {
    padding-left: 10px;
    width: 100%;
    height: 36px;
    text-align: left;
    z-index: 2;
    &:hover {
      background: #eee;
    }
  }
`;
