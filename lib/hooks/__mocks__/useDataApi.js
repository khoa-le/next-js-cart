const regions = [
  {
    code: "VN_50",
    country_id: "VN",
    default_name: "Hồ Chí Minh",
    region_id: 533,
  },
];
export default function useDataApi(url) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => resolve(regions));
  });
}
