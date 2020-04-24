import { useCallback } from "react";
import useSetState from "../../lib/hooks/useSetState";
import useDataApi from "../../lib/hooks/useDataApi";
import BillingAddress from "./BillingAddress";
import PaymentMethod from "./PaymentMethod";
import OrderNote from "./OrderNote";
import OrderButton from "./OrderButton";

const initialFormData = {
  firstName: "Khoa",
  lastName: "Le ",
  email: "khoaln6@gmail.com",
  phone: "0978181187",
  regionId: "533",
  cityId: "",
  address: "86 Nguyen Huu Cau",
  payment_method: "COD",
  comments: ""
};

const OrderForm = ({ checkoutDispath }) => {
  const [formData, setFormData] = useSetState(initialFormData);

  const OrderCreate = useCallback(data => {
    useDataApi("/api/checkout/order/create", {
      headers: {
        Content: "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    }).then(data => {
      console.log("call ajax ok");
      checkoutDispath({ type: "ORDER_SUCCESS", data: data });
    });
  }, []);

  const handleOnSubmit = () => {
    event.preventDefault();
    OrderCreate(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData({ [field]: value });
  };

  return (
    <div className="col-lg-8 order-lg-1">
      <form className="js-validate" onSubmit={handleOnSubmit}>
        <BillingAddress
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <PaymentMethod
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <OrderNote
          formData={formData}
          handleInputChange={handleInputChange}
        ></OrderNote>
        <OrderButton />
      </form>
    </div>
  );
};
export default OrderForm;
