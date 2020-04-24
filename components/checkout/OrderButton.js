import { useRouter } from "next/router";

const OrderButton = () => {
  const router = useRouter();
  return (
    <div className="d-flex justify-content-between align-items-center">
      <a style={{ cursor: "pointer" }} onClick={() => router.back()}>
        <span className="fa fa-angle-left mr-2"></span> Quay Lại
      </a>
      <button
        type="submit"
        className="btn btn-primary u-btn-primary transition-3d-hover"
      >
        Đặt Hàng
      </button>
    </div>
  );
};
export default OrderButton;
