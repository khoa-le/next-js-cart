import Link from "next/link";
import React from "react";
import styled, { css } from "styled-components";
import { colors, mobile } from "../../styles/globalStyle";

const NavBar = styled.button`
  background: ${colors.lightest};
  border: none;
  border-radius: 0;
  display: flex;
  justify-content: center;
  left: 0;
  padding: 0;
  position: relative;
  top: 0;
  ${mobile(css`
    display: none;
  `)}
`;
const Nav = () => (
  <NavBar>
    <ul className="nav">
      <li className="nav-item">
        <Link href="/">
          <a className="nav-link u-header__nav-link pl-0">Home</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/categories">
          <a className="nav-link u-header__nav-link pl-0">Categories</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/products">
          <a className="nav-link u-header__nav-link pl-0">Products</a>
        </Link>
      </li>
    </ul>
  </NavBar>
);
export default Nav;
