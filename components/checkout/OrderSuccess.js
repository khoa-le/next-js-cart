const OrderSuccess = ({ order }) => {
  return (
    <div>
      <h3>Chúc mừng bạn đặt order thành công</h3>
      <p>Order ID: {order.order_id}</p>
      <p>Tổn cộng số tiền: {order.total_amount}</p>
    </div>
  );
};
export default OrderSuccess;
