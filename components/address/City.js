import useDataApi from "../../lib/hooks/useDataApi";
import { useEffect } from "react";

const City = ({ regionId }) => {
  console.log("/api/directory/city?region_id=" + regionId);

  const [{ data}] = useDataApi(
    "/api/directory/city?region_id=" + regionId,
    {},
    []
  );
  const cities = data;

  return (
    <>
      <label className="h6 small d-block text-uppercase">
        Quận/Huyện
        <span className="text-danger">*</span>
      </label>

      <select className="custom-select">
        <option value="">--Chọn Quận/Huyện--</option>
        {cities &&
          cities.map(city => (
            <option key={city.city_id} value={city.city_id}>
              {city.default_name}
            </option>
          ))}
      </select>
    </>
  );
};
export default City;
