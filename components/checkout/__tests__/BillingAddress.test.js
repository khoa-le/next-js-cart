import React from "react";
import BillingAddress from "../BillingAddress";
import { render, cleanup, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
jest.mock("../../../lib/hooks/useDataApi");

const initialFormData = {
  firstName: "Khoa",
  lastName: "Le ",
  email: "khoaln6@gmail.com",
  phone: "0978181187",
  regionId: "533",
  cityId: "",
  address: "86 Nguyen Huu Cau",
  payment_method: "COD",
  comments: "",
};
describe("Billing Form Address", () => {
  let useEffect = React.useEffect;
  beforeAll(() => {
    React.useEffect = React.useLayoutEffect;
  });
  afterAll(() => {
    React.useEffect = useEffect;
  });
  test("should render form", async () => {
    await act(async () => {
      const handleInputChange = jest.fn();

      //const useDataApi = jest.fn();
      //useDataApi.mockReturnValue([Promise.resolve()]);

      const { container, getByText } = render(
        <BillingAddress
          formData={initialFormData}
          handleInputChange={handleInputChange}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
