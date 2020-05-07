import { PrismaClient } from "@prisma/client";
import { PageContext } from "../../components/shared/page-context";
import Product from "../../components/product-detail/Product";
import fetch from "isomorphic-unfetch";

const handleAddToCart = async (data, updateCart) => {
  const response = await fetch("/api/checkout/cart/add", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((r) => r.json())
    .then((cart) => {
      updateCart(cart);
    });
};

const ProductPage = (product) => (
  <PageContext.Consumer>
    {({ cart, updateCart }) => {
      return (
        <Product
          product={product}
          handleAddToCart={handleAddToCart}
          updateCart={updateCart}
        />
      );
    }}
  </PageContext.Consumer>
);

export const getServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const product = await prisma.product.findOne({
    include: {
      ProductsOnAttributes: {
        include: {
          attribute_value: true,
        },
      },
    },
    where: {
      product_id: parseInt(context.params.id),
    },
  });

  return { props: { ...product } };
};

// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const prisma = new PrismaClient();
//   const products = await prisma.product.findMany({});

//   // Get the paths we want to pre-render based on posts
//   const paths = products.map((p) => `/products/${p.product_id}`);

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

export default ProductPage;



