import { useRouter } from "next/router";
import ProductListing from "../components/product-list/ProductListing";
import { GlobalConfiguration } from "../utils/global";
import { PrismaClient } from "@prisma/client";
import auth from "../utils/middleware/useAuth";

const ProductListPage = ({ products }) => {
  return <ProductListing products={products} />;
};

export const getServerSideProps = async context => {
  const {
    ProductListing: { PerPage }
  } = GlobalConfiguration;
  let {
    query: { page }
  } = context;
  page = page == undefined ? 1 : parseInt(page);

  const prisma = new PrismaClient();
  const products = await prisma.product.findMany({
    skip: (page - 1) * PerPage,
    first: PerPage + 1
  });
  return { props: { products: products, page: page } };
};

export default ProductListPage;
