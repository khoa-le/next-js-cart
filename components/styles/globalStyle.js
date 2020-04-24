import { createGlobalStyle } from "styled-components";

export const ThemeConfig = {
  red: "#ff0000",
  black: "#393939",
  grey: "#3A3A3A",
  lightGrey: "#E1E1E1",
  green: "#13C83A",
  offWhite: "#EDEDED",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0,0,0,0.09)",
};

export const GlobalStyle = createGlobalStyle`
html{
  box-sizing: border-box;;
}
*,*:before, *:after{
  box-sizing:inherit;
}
body{
  padding:0px;
  margin:0;
  line-height: 2;
}

p{
  display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
`;
