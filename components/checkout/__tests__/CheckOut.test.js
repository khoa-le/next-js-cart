import { render, cleanup, act } from "@testing-library/react";
import CheckOut from "../CheckOut";
import { PageContext } from "../../shared/page-context";
jest.mock("../../../lib/hooks/useDataApi");

afterEach(cleanup);

const valueContext = {
  cart: {
    userCart: {
      cart_item: []
    }
  }
};

describe("CheckOut", () => {
  test("Can render CheckOut Form", async () => {
    await act(async () => {
      const { container, getByText } = render(
        <PageContext.Provider value={valueContext}>
          <CheckOut />
        </PageContext.Provider>
      );

      const headerElement = getByText("Thanh Toán");
      expect(container.firstChild).toMatchSnapshot();
      expect(headerElement).toBeInTheDocument();
    });
  });
});
