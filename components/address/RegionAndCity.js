import { useState, useCallback, useRef, useEffect } from "react";
import useDataApi from "../../lib/hooks/useDataApi";

import City from "./City";
const RegionAndCity = () => {
  const [regionId, setRegionId] = useState("");
  const [regions, setRegions] = useState([]);
  const refRegionContainer = useRef("");

  const { data } = useDataApi("/api/directory/region", {}, []);

  const handleRegionChange = event => {
    setRegionId(refRegionContainer.current.value);
  };
  return (
    <>
      <div className="col-md-6">
        <div className="js-form-message mb-6">
          <label className="h6 small d-block text-uppercase">
            Tỉnh/Thành Phố
            <span className="text-danger">*</span>
          </label>

          <div className="js-focus-state input-group u-form">
            <select
              ref={refRegionContainer}
              onChange={handleRegionChange}
              className="custom-select"
            >
              <option value="">--Chọn Tỉnh/Thành Phố--</option>
              {regions &&
                regions.map(region => (
                  <option key={region.region_id} value={region.region_id}>
                    {region.default_name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="mb-6">{/* <City regionId={regionId} /> */}</div>
      </div>
    </>
  );
};

export default RegionAndCity;
