import { render, cleanup } from "@testing-library/react";
import ProductListing from "../ProductListing";
import * as nextRouter from "next/router";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
   query: { page: 1 } ,
   asPath: "/products"
  }));

afterEach(cleanup);

const products = [
  {
    product_id: 1,
    image: "12312321",
    name: "Khoa Product",
    price: 4321,
    discounted_price: 0,
  },
  {
    product_id: 2,
    image: "12312123321",
    name: "Khoa Product 1",
    price: 11,
    discounted_price: 0,
  },
];

describe("ProductListing", () => {
  test("Can render Product List 123", () => {
    const { container, getByText } = render(
      <ProductListing products={products} />
    );
    const productName1Element = getByText("Khoa Product");
    const productName2Element = getByText("Khoa Product 1");

    expect(container.firstChild).toMatchSnapshot();
    expect(productName1Element).toBeInTheDocument();
    expect(productName2Element).toBeInTheDocument();
  });
  test("Product List Empty", () => {
    const { container, getByText } = render(<ProductListing products={[]} />);
    const messageEmptyElement = getByText("Product listing was empty");
    expect(messageEmptyElement).toBeInTheDocument();
  });
});
