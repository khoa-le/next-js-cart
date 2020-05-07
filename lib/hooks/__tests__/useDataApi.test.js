jest.mock("isomorphic-unfetch");
import fetch, { Response } from "isomorphic-unfetch";
import useDataApi from "../useDataApi";

describe("useDataApi test", () => {
  
    
  test("test mock", () => {
    useDataApi("/abc", { data: 1 }).then((data) => {
      console.log(data);
    });
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith("/abc", { data:1});
  });
});
