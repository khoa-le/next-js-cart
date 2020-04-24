import { render, cleanup, getByText } from "@testing-library/react";
import OrderSummary from "../OrderSummary";
import { PageContext } from "../../shared/page-context";

import { generate } from "test-utils";

const valueContext = generate.PageContext();

afterEach(cleanup);

describe("OrderSummary", () => {
  test("Should render Item in Cart", () => {
    const { container, getByText } = render(
      <PageContext.Provider value={valueContext}>
        <OrderSummary />
      </PageContext.Provider>
    );

    const headerElement = getByText("Thông tin đơn hàng");
    expect(headerElement).toBeInTheDocument();

    const itemElement = getByText(
      valueContext.cart.userCart.cart_item[0].product_name
    );
    expect(itemElement).toBeInTheDocument();
  });

  test("Should render Total in Cart", () => {
    const { container, queryAllByText } = render(
      <PageContext.Provider value={valueContext}>
        <OrderSummary />
      </PageContext.Provider>
    );

//    expect(container.firstChild).toMatchSnapshot();
    const grandTotalElement = queryAllByText(
      valueContext.cart.userCart.grand_total+""
    )[0];
    expect(grandTotalElement).toBeInTheDocument()
  });
});
