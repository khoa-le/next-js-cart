import React from "react";
import { bool } from "prop-types";
import styled, { css } from "styled-components";
import Link from "next/link";
import { colors, mobile } from "../../styles/globalStyle";

const StyledMenu = styled.ul`
  display: none;
  flex-direction: column;
  background: ${colors.brandBrighter};
  min-height: 100vh;
  text-align: left;
  justify-content: flex-start;
  padding: 6rem 2rem 2rem;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0rem;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  ${mobile(css`
    display:flex;
    width: 100%;
  `)};

  li {
    list-style-type: none;
    a {
      font-size: 1.4rem;
      padding: 2rem 0;
      font-weight: bold;
      color: ${colors.brandDarker};
      text-decoration: none;
      transition: color 0.3s linear;
      ${mobile(css`
        font-size: 1.5rem;
        text-align: center;
      `)}

      &:hover {
        color: ${colors.brandDark};
      }
    }
  }
`;

const MobileNavbar = ({ open }) => {
  return (
    <StyledMenu open={open}>
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
    </StyledMenu>
  );
};

MobileNavbar.propTypes = {
  open: bool.isRequired,
};

export default MobileNavbar;
