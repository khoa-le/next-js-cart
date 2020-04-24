import React from "react";
import { PageContext } from "../shared/page-context";

const OrderSummary = () => {
  return (
    <PageContext.Consumer>
      {({ cart }) => (
        <div className="col-lg-4 order-lg-2 mb-9 mb-lg-0">
          <div className="mb-4">
            <h2 className="h5">Thông tin đơn hàng</h2>
          </div>
          <div className="shadow-sm rounded p-5">
            {cart.userCart.hasOwnProperty("cart_item") &&
              cart.userCart.cart_item.map(item => (
                <div
                  className="media align-items-center mb-5"
                  key={item.item_id}
                >
                  <div className="d-flex position-relative mr-3">
                    <img
                      width="64"
                      className="u-md-avatar rounded"
                      src={`/media/product_images/${item.product.image}`}
                      alt="Image Description"
                    />
                    <span className="u-badge u-badge-primary u-badge-pos rounded-circle">
                      {item.qty}
                    </span>
                  </div>
                  <div className="media-body">
                    <h2 className="h6 mb-0">{item.product_name}</h2>
                    <small className="d-block text-secondary">Small</small>
                  </div>
                  <div className="media-body text-right">
                    <span>{item.price * item.qty}</span>
                  </div>
                </div>
              ))}

            <hr className="my-5" />

            <form className="js-focus-state input-group u-form">
              <input
                type="search"
                className="form-control u-form__input"
                placeholder="Discount"
                aria-label="Discount"
              />
              <div className="input-group-append">
                <button type="button" className="btn btn-primary u-btn-primary">
                  Apply
                </button>
              </div>
            </form>

            <hr className="my-5" />

            <div className="media align-items-center">
              <div className="d-flex mr-3">
                <h3 className="h6 text-secondary">Tạm Tính</h3>
              </div>
              <div className="media-body text-right">
                <span>{cart.userCart.grand_total}</span>
              </div>
            </div>

            <div className="media align-items-center">
              <div className="d-flex mr-3">
                <h3 className="h6 text-secondary">Phí Vận Chuyển</h3>
              </div>
              <div className="media-body text-right">
                <span>miễn phí</span>
              </div>
            </div>

            <hr className="my-5" />

            <div className="media align-items-center">
              <div className="d-flex mr-3">
                <h3 className="h6 text-secondary">Tổng Cộng</h3>
              </div>
              <div className="media-body text-right">
                <strong>{cart.userCart.grand_total}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageContext.Consumer>
  );
};

export default OrderSummary;
