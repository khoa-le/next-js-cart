import React from "react";
export const PageContext = React.createContext({
  cart: { total: 0 },
  changeCart: () => {},
});
