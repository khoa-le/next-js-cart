import styled, { css } from "styled-components";
import { mobile } from "../../styles/globalStyle";
import Link from "next/link";

const Logo = () => (
  <CenterLogo>
    <Link href="/">
      <a
        className="navbar-brand u-header__navbar-brand"
        aria-label="Next JS Cart"
      >
        <img
          src="/assets/images/logo_transparent.png"
          width="150"
          alt="Next Js Cart"
        />
      </a>
    </Link>
  </CenterLogo>
);
const CenterLogo = styled.div`

  ${mobile(css`
    margin: 0 auto !important;
  `)}
  
  & > a.navbar-brand{
    margin-right:0px
  }
`;

export default Logo;
