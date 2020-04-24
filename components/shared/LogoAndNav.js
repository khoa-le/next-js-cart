import styled from 'styled-components';

import Nav from "./Nav";
import Logo from "./Logo";
import HamburgerButton from "./HamburgerButton";

const LogoAndNav = () => (
  <header
    id="header"
    className="u-header u-header--center-aligned u-header--abs-top-md u-header--show-hide-md"
    data-header-fix-moment="500"
    data-header-fix-effect="slide"
  >
    <div className="u-header__section">
      <div id="logoAndNav" className="container">
        <div className="u-header__hide-content">
          <HeaderCenterAligned className="u-header--center-aligned__inner u-header--center-aligned-md__inner">
            <Logo />
            <HamburgerButton/>
          </HeaderCenterAligned>
        </div>
        <nav className="js-mega-menu navbar navbar-expand-md u-header__navbar hs-menu-initialized hs-menu-horizontal">
          <Nav />
        </nav>
      </div>
    </div>
  </header>
);

const HeaderCenterAligned = styled.div`
  text-align: center;
`;
export default LogoAndNav;
