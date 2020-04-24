import { useState } from "react";

const OrderNote = ({ formData, handleInputChange }) => {
  return (
    <>
      <div className="mb-4">
        <h2 className="h5">Ghi chú đơn hàng</h2>
      </div>

      <div>
        <div className="row">
          <div className="col-md-8">
            <div className="js-form-message mb-6">
              <div className="js-focus-state input-group u-form">
                <textarea
                  className="form-control u-form__input"
                  rows="4"
                  name="text"
                  placeholder="Note cho đơn hàng ..."
                  value={formData.comments}
                  onChange={event =>
                    handleInputChange("comments", event.target.value)
                  }
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderNote;
