import { useState } from "react";

const PaymentMethod = ({ formData, handleInputChange }) => {
  const [showCOD, setShowCOD] = useState(formData.payment_method == "COD");
  const [showBT, setShowBT] = useState(
    formData.payment_method == "BANK_TRANSFER"
  );

  const selectPaymentMethod = type => {
    handleInputChange("payment_method", type);
    if (type == "COD") {
      setShowCOD(true);
      setShowBT(false);
    } else if (type == "BANK_TRANSFER") {
      setShowBT(true);
      setShowCOD(false);
    }
  };
  return (
    <>
      <div className="mb-4">
        <h2 className="h5">Hình thức thanh toán</h2>
      </div>

      <div className="btn-group btn-group-toggle mb-6">
        <a
          className={
            "js-animation-link btn btn-sm btn-outline-secondary u-btn-wide--sm " +
            (showCOD ? "active" : "")
          }
          href="#"
          onClick={e => {
            e.preventDefault();
            selectPaymentMethod("COD");
          }}
        >
          Thanh Toán Lúc Nhận Hàng
        </a>
        <a
          className={
            "js-animation-link btn btn-sm btn-outline-secondary u-btn-wide--sm " +
            (showBT ? "active" : "")
          }
          href="#"
          onClick={e => {
            e.preventDefault();
            selectPaymentMethod("BANK_TRANSFER");
          }}
        >
          Chuyển Khoản
        </a>
      </div>

      <div
        id="COD"
        style={{ display: showCOD ? "block" : "none" }}
        data-target-group="paymentMethods"
        className=""
      ></div>

      <div
        id="BANK_TRANSFER"
        data-target-group="paymentMethods"
        className="animated slideInUp"
        style={{ display: showBT ? "block" : "none" }}
      >
        <div className="row">
          <div className="col-md-8">
            <div className="js-form-message mb-6">
              <label className="h6 small d-block text-uppercase">
                Thông tin chuyển khoản:
              </label>

              <div className="js-focus-state input-group u-form">
                <p className="h6 text-secondary">
                  <strong>Ngân hàng Quốc Tế VIB</strong>
                </p>
                <div className="w-100"></div>
                <p className="h6 text-secondary">Chủ tài khoản: LÊ NGỌC KHOA</p>
                <div className="w-100"></div>
                <p className="h6 text-secondary">Số tài khoản: 6000123456</p>
                <div className="w-100"></div>
                <p className="h6 text-secondary">Chi nhánh: Quận 5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
