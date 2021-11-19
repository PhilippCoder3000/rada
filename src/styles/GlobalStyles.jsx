import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #535c69;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
  }
  a {
    text-decoration: none;
  }
  #root {
    background: #eef2f4;
  }
`;
