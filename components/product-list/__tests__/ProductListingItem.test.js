import ProductListingItem from "../ProductListingItem";
import { render, cleanup } from "@testing-library/react";
import "jest-styled-components";
import renderer from "react-test-renderer";
import styled from "styled-components";
import ProductListing from "../ProductListing";

const product = {
  product_id: 1,
  image: "12312321",
  name: "Khoa Product",
  price: 4321,
  discounted_price: 0,
};

afterEach(cleanup);

describe("Product Listing Item", () => {
  test("Can render Product Listing Item", () => {
    const { getByText } = render(<ProductListingItem product={product} />);
    const linkElement = getByText("Khoa Product");
    expect(linkElement).toBeInTheDocument();
  });

  test("See discount price if they have", () => {
    product.discounted_price = 1234;
    const { getByText } = render(<ProductListingItem product={product} />);
    const discountedPriceElement = getByText("1234");
    expect(discountedPriceElement).toBeInTheDocument();
  });
  test("See discount price if they have", () => {
    product.discounted_price = 0;
    const { getByText } = render(<ProductListingItem product={product} />);
    const priceElement = getByText("4321");
    expect(priceElement).toBeInTheDocument();
  });
  test("See current price is Line-through when product have discount", () => {
    product.discounted_price = 1234;
    const { container, getByText } = render(
      <ProductListingItem product={product} />
    );
    expect(container.firstChild).toMatchSnapshot();
    const priceBoxElement = getByText("4321");
    expect(priceBoxElement).toHaveStyleRule("text-decoration", "line-through");
  });
});
