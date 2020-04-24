import { render, cleanup } from "@testing-library/react";
import { screen } from '@testing-library/dom'
import { Simulate } from "react-dom/test-utils";
import Product from "../Product";

beforeEach(cleanup);

const product = {
  product_id: 1,
  image: "12312321",
  name: "Khoa Product",
  price: 4321,
  discounted_price: 0,
  ProductsOnAttributes: [],
};

const productWithAttribute = {
  product_id: 1,
  image: "12312321",
  name: "Khoa Product",
  price: 4321,
  discounted_price: 0,
  ProductsOnAttributes: [
    {
      attribute_value_id: 1,
      product_id: 1,
      attribute_value: {
        attribute_id: 1,
        attribute_value_id: 1,
        value: "Attribute Label S",
      },
    },
  ],
};
const handleAddToCart = jest.fn();
const updateCart = jest.fn();

describe("ProductDetail", () => {
  test("Product Detail can render", () => {
    const { container, getByText } = render(<Product product={product} />);

    const productNameElement = getByText("Khoa Product");
    expect(productNameElement).toBeInTheDocument();
  });

  test("Test Click button add to cart", () => {
    const { container, getByText } = render(
      <Product
        product={product}
        handleAddToCart={handleAddToCart}
        updateCart={updateCart}
      />
    );
    const buttonAddToCartElement = getByText("Add to Cart");
    
    Simulate.click(buttonAddToCartElement, {});

    expect(buttonAddToCartElement).toBeInTheDocument();
    expect(handleAddToCart).toBeCalledTimes(1);
    expect(handleAddToCart).toBeCalledWith(
      {
        product_id: product.product_id,
        options: [{ option: "" }],
        quantity: 1,
        price: product.price,
        name: product.name,
      },
      updateCart
    );
  });

  test("Can see dropdown list select attribute", () => {
    const { container, getByText } = render(
      <Product
        product={productWithAttribute}
        handleAddToCart={handleAddToCart}
        updateCart={updateCart}
      />
    );
    const selectAttributeElement =  screen.getByDisplayValue("Attribute Label S");
    expect(selectAttributeElement).toBeInTheDocument();
  });
});
