export const convertUrlQuery = (urlPath) => {
  return [
    ...new URLSearchParams((urlPath || "").split(/\?/)[1]).entries(),
  ].reduce((q, [k, v]) => Object.assign(q, { [k]: v }), {});
};
