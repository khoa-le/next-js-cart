import fetch from "isomorphic-unfetch";

const useDataApi = async (url, options) => {
  let data = {};
  try {
    const result = await fetch(url, options);
    data = await result.json();
  } catch (error) {}
  return data;
};

export default useDataApi;
