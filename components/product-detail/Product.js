import { useState } from "react";
import styled from "styled-components";

const ButtonOptions = styled.div`
  border: 1px solid #ddd;
  cursor: pointer;
  &.selected {
    border: 1px solid red;
  }
`;

const Product = ({ product, handleAddToCart, updateCart }) => {
  const [option, setOption] = useState("");
  const handleSelectOption = (event) => {
    setOption(event.target.value);
  };
  const data = {
    product_id: product.product_id,
    options: [{ option: option }],
    quantity: 1,
    price: product.price,
    name: product.name,
  };
  return (
    <div className="u-gradient-half-warning-v3">
      <div className="container u-space-2">
        <div className="row justify-content-md-between">
          <div className="col-md-6 mb-7 mb-md-0">
            <img
              className="img-fluid"
              src={`/media/product_images/${product.image}`}
              alt={product.name}
            />
          </div>
          <div className="col-md-5">
            <div className="mb-5">
              <h1 className=" font-weight-normal">{product.name}</h1>
              <span className="d-block h3  mb-3">{product.price}</span>
              <p className="">{product.description}</p>
            </div>
            {product.ProductsOnAttributes.length > 0 ? (
              <div className="w-lg-75 mb-5">
                <div className="d-flex justify-content-between">
                  <label className="h6 small d-block text-uppercase ">
                    Size
                  </label>
                  <a
                    className="h6 small d-block text-uppercase u-link-light"
                    href="#shoppingCartModal"
                    role="button"
                    data-modal-target="#shoppingCartModal"
                    data-overlay-color="#111722"
                  >
                    Size guide
                  </a>
                </div>

                <select className="custom-select" onChange={handleSelectOption}>
                  {product.ProductsOnAttributes.map(
                    ({ attribute_value: { attribute_value_id, value } }) => (
                      <option
                        key={attribute_value_id}
                        value={attribute_value_id}
                      >
                        {value}
                      </option>
                    )
                  )}
                </select>
              </div>
            ) : null}
            <button
              type="button"
              className="btn btn-warning"
              onClick={(event) => {
                return handleAddToCart(data, updateCart);
              }}
            >
              Add to Cart
            </button>
          </div>
          {/* End column 2 */}
        </div>
      </div>
    </div>
  );
};

export default Product;
