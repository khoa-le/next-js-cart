import React from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import CartItem from "./CartItem";
import CartStyled from "../styles/CartStyles";
import CloseButton from "../styles/CloseButton";

import { PageContext } from "../shared/page-context";

class Cart extends React.Component {
  handleDeleteItem = (cartItem, onUpdateCart) => {
    fetch(`/api/checkout/cart/delete/${cartItem.item_id}`)
      .then((r) => r.json())
      .then((cart) => {
        onUpdateCart(cart);
      });
  };
  render() {
    return (
      <PageContext.Consumer>
        {({ cart, updateCart, toggleCart }) => (
          <CartStyled open={cart.cartOpen}>
            <header>
              <CloseButton toggleCart={()=>toggleCart(false)} title="close">
                &times;
              </CloseButton>
              <h3>Giỏ Hàng</h3>
            </header>
            <div className="table-responsive-sm mb-6">
              {cart.userCart.total_qty > 0 ? (
                <table className="table table-borderless bg-white mb-0">
                  <thead>
                    <tr>
                      <th>Sản Phẩm</th>
                      <th>Số Lượng</th>
                      <th>Giá</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.userCart.hasOwnProperty("cart_item") &&
                      cart.userCart.cart_item.map((item) => (
                        <CartItem
                          key={item.item_id}
                          item={item}
                          onDeleteItem={(item) => {
                            this.handleDeleteItem(item, updateCart);
                          }}
                        />
                      ))}
                  </tbody>
                </table>
              ) : (
                <p className="font-italic">
                  Chưa có sản phẩm nào được thêm vào giỏ. Hãy thêm một vài sản
                  phẩm mà bạn muốn.
                </p>
              )}
            </div>
            <footer>
              {cart.userCart.total_qty > 0 ? (
                <>
                  <p>Tổng Tiền: {cart.userCart.grand_total}</p>
                  <Link href="/checkout">
                    <a className="btn btn-danger btn-lg btn-block">
                      Thanh Toán
                    </a>
                  </Link>
                </>
              ) : (
                <button className="btn btn-danger btn-lg btn-block" disabled>
                  Thanh Toán
                </button>
              )}
            </footer>
          </CartStyled>
        )}
      </PageContext.Consumer>
    );
  }
}
export default Cart;
