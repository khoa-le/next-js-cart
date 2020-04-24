import { useReducer, useState } from "react";

import OrderSummary from "./OrderSummary";
import OrderForm from "./OrderForm";
import OrderSuccess from "./OrderSuccess";

const CheckOut = () => {
  const [showSuccessOrder, setShowSuccessOrder] = useState(false);
  const [successOrder, setSuccessOrder] = useState({});
  const initCheckoutState = { showSuccessOrder: false };

  const reducer = (initalState, action) => {
    if (action.type == "ORDER_SUCCESS") {
      setShowSuccessOrder(true);
      setSuccessOrder(action.data);
    }
  };

  const [checkoutState, dispatch] = useReducer(reducer, initCheckoutState);

  return (
    <div className="container">
      <div className="mb-9">
        <h1 className="h2 font-weight-normal">Thanh Toán</h1>
      </div>
      <div className="row">
        {showSuccessOrder ? (
          <OrderSuccess order={successOrder} />
        ) : (
          <>
            <OrderSummary />
            <OrderForm checkoutDispath={dispatch} />
          </>
        )}
      </div>
    </div>
  );
};

export default CheckOut;
