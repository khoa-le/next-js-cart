import { render, cleanup,findByText } from "@testing-library/react";
import Pagination from "../Pagination";
import * as nextRouter from "next/router";
import { GlobalConfiguration } from "../../../utils/global";

nextRouter.useRouter = jest.fn();


afterEach(cleanup);

describe("Pagination", () => {
  test("Can render next pagination", () => {
    nextRouter.useRouter.mockImplementation(() => ({
      query: { page: 1 },
      asPath: "/products",
    }));
    const { container, getByText,findByDisplayValue } = render(
      <Pagination
        numberProducts={GlobalConfiguration.ProductListing.PerPage + 1}
      />
    );
    const nextLinkElement = getByText("Next »");
    expect(container.firstChild).toMatchSnapshot();
    expect(nextLinkElement).toBeInTheDocument();
    expect(container.querySelector("ul.pagination li .previous")).toBeNull()
  });
  test("Can render prev and next pagination", () => {
    nextRouter.useRouter.mockImplementation(() => ({
      query: { page:2 },
      asPath: "/products",
    }));
    const { container, getByText } = render(
      <Pagination
        numberProducts={GlobalConfiguration.ProductListing.PerPage + 1}
      />
    );
    const prevLinkElement = getByText("« Previous");
    const nextLinkElement = getByText("Next »");

    expect(container.firstChild).toMatchSnapshot();
    expect(prevLinkElement).toBeInTheDocument();
    expect(nextLinkElement).toBeInTheDocument();
  });

  test("Can render prev button and hide next when number product < perPage +1",()=>{
    const {container, getByText} = render(
      <Pagination numberProducts={GlobalConfiguration.ProductListing.PerPage-1}/>
    )

    const prevLinkElement = getByText("« Previous");
    expect(container.firstChild).toMatchSnapshot();
    expect(prevLinkElement).toBeInTheDocument();
    expect(container.querySelector("ul.pagination li .next")).toBeNull()

  })

  
});
