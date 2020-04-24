const regions = [];

export default function useDataApi(url) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => resolve(regions));
  });
}
