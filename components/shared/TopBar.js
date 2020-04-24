import styled from "styled-components";
import { PageContext } from "../shared/page-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const TopBar = () => (
  <PageContext.Consumer>
    {({ cart, toggleCart }) => (
      <TopBarStyle className="container pt-2">
        <div className="d-flex flex-row-reverse mb-0">
          <ul className="list-inline ml-2 mb-0">
            <li className="list-inline-item position-relative">
              <a
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
              </a>
            </li>
          </ul>
        </div>
      </TopBarStyle>
    )}
  </PageContext.Consumer>
);
const TopBarStyle = styled.div`
  position: absolute;
`;

export default TopBar;
