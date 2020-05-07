import { useState, useEffect, useCallback } from "react";
import useDataApi from "../../lib/hooks/useDataApi";

const BillingAddress = ({ formData, handleInputChange }) => {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    useDataApi("/api/directory/region", {}).then((data) => {
      setRegions(data)
      
    });
  }, []);

  const fetchCityByRegion = useCallback((region_id) => {
    useDataApi("/api/directory/city?region_id=" + region_id, {}).then((data) =>
      setCities(data)
    );
  }, []);

  const handleRegionChange = (event) => {
    const region_id = event.target.value;
    fetchCityByRegion(region_id);
    handleInputChange("regionId", region_id);
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="h5">Địa chỉ nhận hàng</h2>
      </div>

      <div className="row mb-9">
        <div className="col-md-6">
          <div className="js-form-message mb-6">
            <label className="h6 small d-block text-uppercase">
              Tên
              <span className="text-danger">*</span>
            </label>

            <div className="js-focus-state input-group u-form">
              <input
                className="form-control u-form__input"
                type="text"
                onChange={(event) =>
                  handleInputChange("firstName", event.target.value)
                }
                value={formData.firstName}
                required=""
                placeholder="Jack"
                aria-label="Jack"
                data-msg="Please enter your frist name."
                data-error-class="u-has-error"
                data-success-class="u-has-success"
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="js-form-message mb-6">
            <label className="h6 small d-block text-uppercase">
              Họ
              <span className="text-danger">*</span>
            </label>

            <div className="js-focus-state input-group u-form">
              <input
                className="form-control u-form__input"
                type="text"
                onChange={(event) =>
                  handleInputChange("lastName", event.target.value)
                }
                value={formData.lastName}
                required=""
                placeholder="Wayley"
                aria-label="Wayley"
                data-msg="Please enter your last name."
                data-error-class="u-has-error"
                data-success-class="u-has-success"
              />
            </div>
          </div>
        </div>

        <div className="w-100"></div>

        <div className="col-md-6">
          <div className="js-form-message mb-6">
            <label className="h6 small d-block text-uppercase">
              Email address
              <span className="text-danger">*</span>
            </label>

            <div className="js-focus-state input-group u-form">
              <input
                className="form-control u-form__input"
                type="email"
                onChange={(event) =>
                  handleInputChange("email", event.target.value)
                }
                value={formData.email}
                required=""
                placeholder="jackwayley@gmail.com"
                aria-label="jackwayley@gmail.com"
                data-msg="Please enter a valid email address."
                data-error-class="u-has-error"
                data-success-class="u-has-success"
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="js-form-message mb-6">
            <label className="h6 small d-block text-uppercase">
              Số điện thoại
              <span className="text-danger">*</span>
            </label>

            <div className="js-focus-state input-group u-form">
              <input
                className="form-control u-form__input"
                type="text"
                onChange={(event) =>
                  handleInputChange("phone", event.target.value)
                }
                value={formData.phone}
                placeholder="+1 (062) 109-9222"
                aria-label="+1 (062) 109-9222"
                data-msg="Please enter your last name."
                data-error-class="u-has-error"
                data-success-class="u-has-success"
              />
            </div>
          </div>
        </div>

        <div className="w-100"></div>

        <div className="col-md-6">
          <div className="js-form-message mb-6">
            <label className="h6 small d-block text-uppercase">
              Tỉnh/Thành Phố
              <span className="text-danger">*</span>
            </label>

            <div className="js-focus-state input-group u-form">
              <select onChange={handleRegionChange} className="custom-select">
                <option value="">--Chọn Tỉnh/Thành Phố--</option>
                {regions  &&
                  regions.map((region) => (
                    <option key={region.region_id} value={region.region_id}>
                      {region.default_name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-6">
            <label className="h6 small d-block text-uppercase">
              Quận/Huyện
              <span className="text-danger">*</span>
            </label>

            <select
              className="custom-select"
              onChange={(event) =>
                handleInputChange("cityId", event.target.value)
              }
            >
              <option value="">--Chọn Quận/Huyện--</option>
              {cities &&
                cities.map((city) => (
                  <option key={city.city_id} value={city.city_id}>
                    {city.default_name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-100"></div>

        <div className="col-md-12">
          <div className="js-form-message mb-6">
            <label className="h6 small d-block text-uppercase">
              Địa chỉ
              <span className="text-danger">*</span>
            </label>

            <div className="js-focus-state input-group u-form">
              <input
                className="form-control u-form__input"
                type="text"
                onChange={(event) =>
                  handleInputChange("address", event.target.value)
                }
                value={formData.address}
                required=""
                placeholder="470 Lucy Forks"
                aria-label="470 Lucy Forks"
                data-msg="Please enter a valid address."
                data-error-class="u-has-error"
                data-success-class="u-has-success"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BillingAddress;
