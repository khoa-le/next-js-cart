import { createGlobalStyle,css } from "styled-components";

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


//color pattern from https://designsystem.reactioncommerce.com/#/Style/Colors
export const colors = {
  brandDarker: '#1e4035',
  brandDark: '#285749',
  brand: '#158562',
  brandBright: '#0db781',
  brandBrighter: '#b4ddc1',
  brandBrightest: '#dcfaf1',
  lightest: '#ffffff',
  text: '#333333',
  textMild: '#555555',
  textLight: '#7e718a',
  textLighter: '#aaaaaa',
  lilac: `#8c65b3`,
  accent: `#ffb238`,
  error: `#ec1818`,
  lemon: `#ffdf37`
};

export const spacing = {
  '3xs': 2,
  '2xs': 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48
};


export const breakpoints = {
  mobile: 400,
  phablet: 550,
  tablet: 750,
  desktop: 1000,
  hd: 1300
};

export const radius = {
  default: 2,
  large: 4
};

export const defaultFontStack = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Open Sans',
  'Helvetica Neue',
  'sans-serif'
].join();

const monospaceFontStack = [
  `Space Mono`,
  `SFMono-Regular`,
  `Menlo`,
  `Monaco`,
  `Consolas`,
  `Liberation Mono`,
  `Courier New`,
  `monospace`
].join();

export const fonts = {
  body: defaultFontStack,
  heading: `Futura PT, ${defaultFontStack}`,
  monospace: monospaceFontStack
};

export const mobile = inner => css`
@media (max-width: ${1000 / 16}em) {
  ${inner};
}
`;

export const phone = inner => css`
@media (max-width: ${650 / 16}em) {
  ${inner};
}
`;