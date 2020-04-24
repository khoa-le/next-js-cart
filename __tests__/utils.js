import React from "react";
import {render} from "@testing-library/react"
import Index from "../pages/index";

test("render index page", () => {
    const {getByText} = render(<Index/>);
    const linkElement = getByText("Next.js!")
    expect(linkElement).toBeInTheDocument()
});
