import Link from "next/link";
import styled, { css } from "styled-components";
import { PageContext } from "../shared/page-context";
import useUser from "../../lib/hooks/useUser";
import { mobile } from "../styles/globalStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const TopBarListItem = styled.li`
   &.hideMobile {
    ${mobile(
      css`
        display:none !important;
      `
    )}
  }
`;

const TopBar = () => {
  const user = useUser();
  return (
    <PageContext.Consumer>
      {({ cart, toggleCart }) => (
        <TopBarStyle className="container pt-2">
          <div className="d-flex flex-row-reverse mb-0">
            <ul className="list-inline ml-2 mb-0">
              {user ? (
                <>
                  <TopBarListItem className="list-inline-item mr-0 hideMobile">
                    <Link href="/user/profile">
                      <a className="u-header__topbar-nav-link" href="#">
                        My Account
                      </a>
                    </Link>
                  </TopBarListItem>
                  <TopBarListItem className="list-inline-item mr-0 hideMobile ">
                    <Link href="/api/user/logout">
                      <a className="u-header__topbar-nav-link" href="#">
                        Log out
                      </a>
                    </Link>
                  </TopBarListItem>
                </>
              ) : (
                <>
                 <TopBarListItem className="list-inline-item mr-0 hideMobile">
                    <Link href="/user/login">
                      <a className="u-header__topbar-nav-link" href="#">
                        Login
                      </a>
                    </Link>
                  </TopBarListItem>
                  <TopBarListItem className="list-inline-item mr-0 hideMobile">
                    <Link href="/user/signup">
                      <a className="u-header__topbar-nav-link" href="#">
                        Sign up
                      </a>
                    </Link>
                  </TopBarListItem>
                </>
              )}
              <TopBarListItem className="list-inline-item position-relative">
                <CartIcon
                  id="shoppingCartDropdownInvoker"
                  className="btn btn-xs u-btn--icon u-btn-text-secondary"
                  href="#"
                  onClick={toggleCart}
                  role="button"
                  aria-controls="shoppingCartDropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-unfold-event="hover"
                  data-unfold-target="#shoppingCartDropdown"
                  data-unfold-type="css-animation"
                  data-unfold-duration="300"
                  data-unfold-delay="300"
                  data-unfold-hide-on-scroll="true"
                  data-unfold-animation-in="slideInUp"
                  data-unfold-animation-out="fadeOut"
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  {cart.userCart.total_qty > 0 ? (
                    <span
                      style={{ top: "15px", right: "15px" }}
                      className="u-badge u-badge-primary u-badge-pos u-badge--sm rounded-circle"
                    >
                      {cart.userCart.total_qty}
                    </span>
                  ) : null}
                </CartIcon>
              </TopBarListItem>
            </ul>
          </div>
        </TopBarStyle>
      )}
    </PageContext.Consumer>
  );
};
const TopBarStyle = styled.div`
  position: absolute;
`;

const CartIcon = styled.a`
  ${mobile(css`
      font-size:2rem
  `)}
`

export default TopBar;
