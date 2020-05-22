import CheckOut from "../components/checkout/CheckOut";
import PageBlank from "../components/shared/PageBlank";
const CheckOutPage = () => {
  return <CheckOut />;
};

CheckOutPage.layout = PageBlank;
CheckOutPage.getInitialProps = async ({ req, res }) => {
  return {};
};

export default CheckOutPage;
